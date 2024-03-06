const lifecycle = {
  beforeLoad: (appWindow: any) => {
    console.log('beforeLoad>>>', { appCode: appWindow.__WUJIE?.id, url: appWindow.__WUJIE?.url })
  },
  beforeMount: (appWindow: any) => {
    console.log('beforeMount>>>', { appCode: appWindow.__WUJIE?.id, url: appWindow.__WUJIE?.url })
  },
  afterMount: (appWindow: any) => {
    console.log('afterMount>>>', { appCode: appWindow.__WUJIE?.id, url: appWindow.__WUJIE?.url })
  },
  beforeUnmount: (appWindow: any) => {
    console.log('beforeUnmount>>>', { appCode: appWindow.__WUJIE?.id, url: appWindow.__WUJIE?.url })
  },
  afterUnmount: (appWindow: any) => {
    console.log('afterUnmount>>>', { appCode: appWindow.__WUJIE?.id, url: appWindow.__WUJIE?.url })
  },
  activated: (appWindow: any) => {
    console.log('activated>>>', { appCode: appWindow.__WUJIE?.id, url: appWindow.__WUJIE?.url })
  },
  deactivated: (appWindow: any) => {
    console.log('deactivated>>>', { appCode: appWindow.__WUJIE?.id, url: appWindow.__WUJIE?.url })
    const __WUJIE_ID = appWindow.__WUJIE?.id
    if (!__WUJIE_ID)
      location.reload()
  },
  loadError: (url: string, e: any) => {
    console.log(`${url} 加载失败`, e)
  },
}

export default lifecycle
