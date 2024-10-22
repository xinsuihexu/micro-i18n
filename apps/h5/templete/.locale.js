import fs from 'node:fs/promises'
import path from 'node:path'
import { v4 as uuidv4 } from 'uuid'

const ignoreDirs = ['assets', 'locales', 'node_modules', 'package.json']
const ignoreFiles = ['.locale.js', 'auto-imports.d.ts', 'components.d.ts']

const reg = /\$t\((.*?)\)/g
const dictionaryPath = path.join(path.resolve(), 'src/locales/zh-CN.json')
let dictionary = {}
const collectedValues = new Set()

async function loadDictionary() {
  try {
    const data = await fs.readFile(dictionaryPath, { encoding: 'utf8' })
    dictionary = JSON.parse(data)
    console.log('**** Loaded dictionary from file ****')
  }
  catch (error) {
    console.error('Error loading dictionary from file:', error)
  }
}

function shouldCollectValue(value, collectedValues, dictionary) {
  return value && !collectedValues.has(value) && !Object.values(dictionary).includes(value)
}

async function collectValue(value) {
  const key = uuidv4()
  dictionary[key] = value
  collectedValues.add(value)
  console.log(`**** collect value: ${value} ****`)
}

async function traverseDir(scanPath) {
  const direntList = await fs.readdir(scanPath, { withFileTypes: true })

  await Promise.all(direntList.map(async (dirent) => {
    if (dirent.isDirectory() && !ignoreDirs.includes(dirent.name)) {
      await traverseDir(path.join(scanPath, dirent.name))
    }
    else if (dirent.isFile() && !ignoreFiles.includes(dirent.name)) {
      const file = await fs.readFile(path.join(scanPath, dirent.name), { encoding: 'utf8' })
      const matchList = file.match(reg)

      if (Array.isArray(matchList)) {
        console.log(`**** match file ${path.join(scanPath, dirent.name)} ****`)
        console.log(`**** get i18n $t() on ${path.join(scanPath, dirent.name)} ****`)
        console.log(matchList)

        matchList.forEach((match) => {
          const value = (match.match(/'(.*?)'|"(.*?)"|`(.*?)`/) || [])[0]?.replace(/["'`]/g, '')

          if (shouldCollectValue(value, collectedValues, dictionary))
            collectValue(value)
          else
            console.log(`**** value ${value} already collected ****`)
        })
      }
    }
  }))
}

async function scanAndWriteDictionary(scanPath) {
  console.log(`start to traverse dir: ${scanPath}`)

  await loadDictionary()
  await traverseDir(scanPath)

  console.log('**** dictionary collect completed ****')
  console.log(dictionary)
  console.log(`**** dictionary start write to ${dictionaryPath}****`)

  await fs.writeFile(dictionaryPath, JSON.stringify(dictionary, null, 2), { encoding: 'utf8' })

  console.log(`**** dictionary write to ${dictionaryPath} completed! ****`)
}

scanAndWriteDictionary(path.resolve('src'))
