interface Window {
  Parse: any
  initializeParse: () => Promise<boolean>
  BACK4APP_APPLICATION_ID?: string
  BACK4APP_JAVASCRIPT_KEY?: string
  BACK4APP_SERVER_URL?: string
  PARSE_DEMO_MODE?: boolean
}
