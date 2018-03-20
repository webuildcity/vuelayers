import { getProj } from './ol-ext/proj'
import { warn } from './util/log'

/**
 * VueLayers global options key.
 * @type {symbol}
 */
export const VL_OPTIONS_KEY = Symbol('options')

/**
 * Shared install.
 * @param {Vue|VueConstructor} Vue
 * @param {VueLayersOptions} [options]
 *
 * @todo should that function be used in each component's install function?
 */
export function install (Vue, options = {}) {
  if (
    process.env.NODE_ENV !== 'production' &&
    options.bindToProj &&
    !getProj(options.bindToProj)
  ) {
    warn('Projection "' + options.bindToProj + '" isn\'t added to the list of known projections. ' +
      'It should be added before VueLayers install with OpenLayers or VueLayers API.')
  }
  // extend Vue with VueLayers global methods and options
  Vue[VL_OPTIONS_KEY] = Vue.prototype[VL_OPTIONS_KEY] = options
}
