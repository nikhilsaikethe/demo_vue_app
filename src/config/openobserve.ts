import { openobserveRum } from '@openobserve/browser-rum'
import { openobserveLogs } from '@openobserve/browser-logs'

export interface OpenObserveConfig {
  clientToken: string
  applicationId: string
  site: string
  service: string
  env: string
  version: string
  organizationIdentifier: string
  insecureHTTP: boolean
  apiVersion: string
}

export const getOpenObserveConfig = (): OpenObserveConfig => {
  return {
    clientToken: import.meta.env.VITE_OPENOBSERVE_CLIENT_TOKEN || '',
    applicationId: import.meta.env.VITE_OPENOBSERVE_APPLICATION_ID || '',
    site: import.meta.env.VITE_OPENOBSERVE_SITE || '',
    service: import.meta.env.VITE_OPENOBSERVE_SERVICE || '',
    env: import.meta.env.VITE_OPENOBSERVE_ENV || 'development',
    version: import.meta.env.VITE_OPENOBSERVE_VERSION || '0.0.1',
    organizationIdentifier: import.meta.env.VITE_OPENOBSERVE_ORG_IDENTIFIER || 'default',
    insecureHTTP: import.meta.env.VITE_OPENOBSERVE_INSECURE_HTTP === 'true',
    apiVersion: import.meta.env.VITE_OPENOBSERVE_API_VERSION || 'v1'
  }
}

export const initializeOpenObserve = () => {
  const options = getOpenObserveConfig()

  // Validate required configuration
  if (!options.clientToken || !options.applicationId || !options.site) {
    console.warn(
      'OpenObserve: Missing required configuration. Skipping initialization.',
      {
        hasClientToken: !!options.clientToken,
        hasApplicationId: !!options.applicationId,
        hasSite: !!options.site
      }
    )
    return
  }

  try {
    // Initialize RUM
    openobserveRum.init({
      applicationId: options.applicationId,
      clientToken: options.clientToken,
      site: options.site,
      organizationIdentifier: options.organizationIdentifier,
      service: options.service,
      env: options.env,
      version: options.version,
      trackResources: true,
      trackLongTasks: true,
      trackUserInteractions: true,
      apiVersion: options.apiVersion,
      insecureHTTP: options.insecureHTTP,
      defaultPrivacyLevel: 'allow'
    })

    // Initialize Logs
    openobserveLogs.init({
      clientToken: options.clientToken,
      site: options.site,
      organizationIdentifier: options.organizationIdentifier,
      service: options.service,
      env: options.env,
      version: options.version,
      forwardErrorsToLogs: true,
      insecureHTTP: options.insecureHTTP,
      apiVersion: options.apiVersion
    })

    // Optional: Set user context
    // openobserveRum.setUser({
    //   id: '1',
    //   name: 'Captain Hook',
    //   email: 'captainhook@example.com'
    // })

    // Start session replay recording
    openobserveRum.startSessionReplayRecording()

    console.log('OpenObserve initialized successfully')
  } catch (error) {
    console.error('Failed to initialize OpenObserve:', error)
  }
}

export { openobserveRum, openobserveLogs }
