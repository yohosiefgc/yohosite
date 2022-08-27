//TODO: Import from another js file

import parseUnit from 'parse-unit'
import eases from 'eases'

const instances = []import parseUnit from 'parse-unit'
import eases from 'eases'

const instances = []
const isBrowser = typeof window !== 'undefined'

/**
 * Debounces a function that will be triggered many times.
 * @param {Function} fn
 * @param {Number} duration
 * @returns {Function}
 */
const debounce = function(fn, duration) {

	let timeout = null

	return (...args) => {

		clearTimeout(timeout)

		timeout = setTimeout(() => fn(...args), duration)

	}

}

/**
 * Returns all active instances from an array.
 * @param {Array} instances
 * @returns {Array} instances - Active instances.
 */
const getActiveInstances = function(instances) {

	return instances.filter((instance) => instance != null && instance.isActive())

}

/**
 * Returns all tracked instances from an array.
 * @param {Array} instances
 * @returns {Array} instances - Tracked instances.
 */
const getTrackedInstances = function(instances) {

	return instances.filter((instance) => instance != null && instance.getData().track)

}


/**
 * Returns the number of scrolled pixels.
 * @returns {Number} scrollTop
 */
const getScrollTop = function() {

	// Use scrollTop because it's faster than getBoundingClientRect()
	return (document.scrollingElement || document.documentElement).scrollTop

}

/**
 * Returns the height of the viewport.
 * @returns {Number} viewportHeight
 */
const getViewportHeight = function() {

	return (window.innerHeight || window.outerHeight)

}

/**
 * Checks if a value is absolute.
 * An absolute value must have a value that's not NaN.
 * @param {String|Integer} value
 * @returns {Boolean} isAbsolute
 */
const isAbsoluteValue = function(value) {

	return isNaN(parseUnit(value)[0]) === false

}

/**
 * Parses an absolute value.
 * @param {String|Integer} value
 * @returns {Object} value - Parsed value.
 */
const parseAbsoluteValue = function(value) {

	const parsedValue = parseUnit(value)

	return {
		value: parsedValue[0],
		unit: parsedValue[1]
	}

}

/**
 * Checks if a value is relative.
 * A relative value must start and end with [a-z] and needs a '-' in the middle.
 * @param {String|Integer} value
 * @returns {Boolean} isRelative
 */
const isRelativeValue = function(value) {

	return String(value).match(/^[a-z]+-[a-z]+$/) !== null

}

/**
 * Returns the property that should be used according to direct.
 * @param {Boolean|Node} direct
 * @param {Object} properties
 * @returns {*}
 */
const mapDirectToProperty = function(direct, properties) {

	if (direct === true) return properties.elem
	if (direct instanceof HTMLElement === true) return properties.direct

	return properties.global

}

/**
 * Converts a relative value to an absolute value.
 * @param {String} value
 * @param {Node} elem - Anchor of the relative value.
 * @param {?Integer} scrollTop - Pixels scrolled in document.
 * @param {?Integer} viewportHeight - Height of the viewport.
 * @returns {String} value - Absolute value.
 */
const relativeToAbsoluteValue = function(value, elem, scrollTop = getScrollTop(), viewportHeight = getViewportHeight()) {

	const elemSize = elem.getBoundingClientRect()

	const elemAnchor = value.match(/^[a-z]+/)[0]
	const viewportAnchor = value.match(/[a-z]+$/)[0]

	let y = 0

	if (viewportAnchor === 'top') y -= 0
	if (viewportAnchor === 'middle') y -= viewportHeight / 2
	if (viewportAnchor === 'bottom') y -= viewportHeight

	if (elemAnchor === 'top') y += (elemSize.top + scrollTop)
	if (elemAnchor === 'middle') y += (elemSize.top + scrollTop) + elemSize.height / 2
	if (elemAnchor === 'bottom') y += (elemSize.top + scrollTop) + elemSize.height

	return `${ y }px`

}

/**
 * Validates data and sets defaults for undefined properties.
 * @param {?Object} data
 * @returns {Object} data - Validated data.
 */
const validate = function(data = {}) {

	// Copy root object to avoid changes by reference
	data = Object.assign({}, data)

	if (data.inside == null) data.inside = () => {}
	if (data.outside == null) data.outside = () => {}
	if (data.direct == null) data.direct = false
	if (data.track == null) data.track = true
	if (data.props == null) data.props = {}

	if (data.from == null) throw new Error('Missing property `from`')
	if (data.to == null) throw new Error('Missing property `to`')
	if (typeof data.inside !== 'function') throw new Error('Property `inside` must be undefined or a function')
	if (typeof data.outside !== 'function') throw new Error('Property `outside` must be undefined or a function')
	if (typeof data.direct !== 'boolean' && data.direct instanceof HTMLElement === false) throw new Error('Property `direct` must be undefined, a boolean or a DOM element/node')
	if (data.direct === true && data.elem == null) throw new Error('Property `elem` is required when `direct` is true')
	if (typeof data.track !== 'boolean') throw new Error('Property `track` must be undefined or a boolean')
	if (typeof data.props !== 'object') throw new Error('Property `props` must be undefined or an object')

	if (data.elem == null) {

		if (isAbsoluteValue(data.from) === false) throw new Error('Property `from` must be a absolute value when no `elem` has been provided')
		if (isAbsoluteValue(data.to) === false) throw new Error('Property `to` must be a absolute value when no `elem` has been provided')

	} else {

		if (isRelativeValue(data.from) === true) data.from = relativeToAbsoluteValue(data.from, data.elem)
		if (isRelativeValue(data.to) === true) data.to = relativeToAbsoluteValue(data.to, data.elem)

	}

	data.from = parseAbsoluteValue(data.from)
	data.to = parseAbsoluteValue(data.to)

	// Create a new props object to avoid changes by reference
	data.props = Object.keys(data.props).reduce((acc, key) => {

		// Copy prop object to avoid changes by reference
		const prop = Object.assign({}, data.props[key])

		if (isAbsoluteValue(prop.from) === false) throw new Error('Property `from` of prop must be a absolute value')
		if (isAbsoluteValue(prop.to) === false) throw new Error('Property `from` of prop must be a absolute value')

		prop.from = parseAbsoluteValue(prop.from)
		prop.to = parseAbsoluteValue(prop.to)

		if (prop.timing == null) prop.timing = eases['linear']

		if (typeof prop.timing !== 'string' && typeof prop.timing !== 'function') throw new Error('Property `timing` of prop must be undefined, a string or a function')

		if (typeof prop.timing === 'string' && eases[prop.timing] == null) throw new Error('Unknown timing for property `timing` of prop')
		if (typeof prop.timing === 'string') prop.timing = eases[prop.timing]

		acc[key] = prop

		return acc

	}, {})

	return data

}

/**
 * Calculates the props of an instance.
 * @param {Object} instance
 * @param {?Integer} scrollTop - Pixels scrolled in document.
 * @returns {Object} Calculated props and the element to apply styles to.
 */
const getProps = function(instance, scrollTop = getScrollTop()) {

	const data = instance.getData()

	// 100% in pixel
	const total = data.to.value - data.from.value

	// Pixel scrolled
	const current = scrollTop - data.from.value

	// Percent scrolled
	const precisePercentage = current / (total / 100)
	const normalizedPercentage = Math.min(Math.max(precisePercentage, 0), 100)

	// Get the element that should be used according to direct
	const elem = mapDirectToProperty(data.direct, {
		global: document.documentElement,
		elem: data.elem,
		direct: data.direct
	})

	// Generate an object with all new props
	const props = Object.keys(data.props).reduce((acc, key) => {

		const prop = data.props[key]

		// Use the unit of from OR to. It's valid to animate from '0' to '100px' and
		// '0' should be treated as 'px', too. Unit will be an empty string when no unit given.
		const unit = prop.from.unit || prop.to.unit

		// The value that should be interpolated
		const diff = prop.from.value - prop.to.value

		// All easing functions only remap a time value, and all have the same signature.
		// Typically a value between 0 and 1, and it returns a new float that has been eased.
		const time = prop.timing(normalizedPercentage / 100)

		const value = prop.from.value - diff * time

		// Round to avoid unprecise values.
		// The precision of floating point computations is only as precise as the precision it uses.
		// http://stackoverflow.com/questions/588004/is-floating-point-math-broken
		const rounded = Math.round(value * 10000) / 10000

		acc[key] = rounded + unit

		return acc

	}, {})

	// Use precise percentage to check if the viewport is between from and to.
	// Would always return true when using the normalized percentage.
	const isInside = (precisePercentage >= 0 && precisePercentage <= 100)
	const isOutside = (precisePercentage < 0 || precisePercentage > 100)

	// Execute callbacks
	if (isInside === true) data.inside(instance, precisePercentage, props)
	if (isOutside === true) data.outside(instance, precisePercentage, props)

	return {
		elem,
		props
	}

}

/**
 * Adds a property with the specified name and value to a given style object.
 * @param {Node} elem - Styles will be applied to this element.
 * @param {Object} prop - Object with a key and value.
 */
const setProp = function(elem, prop) {

	elem.style.setProperty(prop.key, prop.value)

}

/**
 * Adds properties to a given style object.
 * @param {Node} elem - Styles will be applied to this element.
 * @param {Object} props - Object of props.
 */
const setProps = function(elem, props) {

	Object.keys(props).forEach((key) => setProp(elem, {
		key: key,
		value: props[key]
	}))

}

/**
 * Gets and sets new props when the user has scrolled and when there are active instances.
 * This part get executed with every frame. Make sure it's performant as hell.
 * @param {Object} style - Style object.
 * @param {?Integer} previousScrollTop
 * @returns {?*}
 */
const loop = function(style, previousScrollTop) {

	// Continue loop
	const repeat = () => {

		// It depends on the browser, but it turns out that closures
		// are sometimes faster than .bind or .apply.
		requestAnimationFrame(() => loop(style, previousScrollTop))

	}

	// Get all active instances
	const activeInstances = getActiveInstances(instances)

	// Only continue when active instances available
	if (activeInstances.length === 0) return repeat()

	const scrollTop = getScrollTop()

	// Only continue when scrollTop has changed
	if (previousScrollTop === scrollTop) return repeat()
	else previousScrollTop = scrollTop

	// Get and set new props of each instance
	activeInstances
		.map((instance) => getProps(instance, scrollTop))
		.forEach(({ elem, props }) => setProps(elem, props))

	repeat()

}

/**
 * Creates a new instance.
 * @param {Object} data
 * @returns {Object} instance
 */
export const create = function(data) {

	// Store the parsed data
	let _data = null

	// Store if instance is started or stopped
	let active = false

	// Returns if instance is started or stopped
	const _isActive = () => {

		return active

	}

	// Returns the parsed and calculated data
	const _getData = function() {

		return _data

	}

	// Parses and calculates data
	const _calculate = function() {

		_data = validate(data)

	}

	// Update props
	const _update = () => {

		// Get new props
		const { elem, props } = getProps(instance)

		// Set new props
		setProps(elem, props)

		return props

	}

	// Starts to animate
	const _start = () => {

		active = true

	}

	// Stops to animate
	const _stop = () => {

		active = false

	}

	// Destroys the instance
	const _destroy = () => {

		// Replace instance instead of deleting the item to avoid
		// that the index of other instances changes.
		instances[index] = undefined

	}

	// Assign instance to a variable so the instance can be used
	// elsewhere in the current function.
	const instance = {
		isActive: _isActive,
		getData: _getData,
		calculate: _calculate,
		update: _update,
		start: _start,
		stop: _stop,
		destroy: _destroy
	}

	// Store instance in global array and save the index
	const index = instances.push(instance) - 1

	// Calculate data for the first time
	instance.calculate()

	return instance

}

// Only run basicScroll when executed in a browser environment

if (isBrowser === true) {

	// Start to loop
	loop()

	// Recalculate and update instances when the window size changes
	window.addEventListener('resize', debounce(() => {

		// Get all tracked instances
		const trackedInstances = getTrackedInstances(instances)

		trackedInstances.forEach((instance) => {
			instance.calculate()
			instance.update()
		})

	}, 50))

} else {

	console.warn('basicScroll is not executing because you are using it in an environment without a `window` object')

}
const isBrowser = typeof window !== 'undefined'

/**
 * Debounces a function that will be triggered many times.
 * @param {Function} fn
 * @param {Number} duration
 * @returns {Function}
 */
const debounce = function(fn, duration) {

	let timeout = null

	return (...args) => {

		clearTimeout(timeout)

		timeout = setTimeout(() => fn(...args), duration)

	}

}

/**
 * Returns all active instances from an array.
 * @param {Array} instances
 * @returns {Array} instances - Active instances.
 */
const getActiveInstances = function(instances) {

	return instances.filter((instance) => instance != null && instance.isActive())

}

/**
 * Returns all tracked instances from an array.
 * @param {Array} instances
 * @returns {Array} instances - Tracked instances.
 */
const getTrackedInstances = function(instances) {

	return instances.filter((instance) => instance != null && instance.getData().track)

}


/**
 * Returns the number of scrolled pixels.
 * @returns {Number} scrollTop
 */
const getScrollTop = function() {

	// Use scrollTop because it's faster than getBoundingClientRect()
	return (document.scrollingElement || document.documentElement).scrollTop

}

/**
 * Returns the height of the viewport.
 * @returns {Number} viewportHeight
 */
const getViewportHeight = function() {

	return (window.innerHeight || window.outerHeight)

}

/**
 * Checks if a value is absolute.
 * An absolute value must have a value that's not NaN.
 * @param {String|Integer} value
 * @returns {Boolean} isAbsolute
 */
const isAbsoluteValue = function(value) {

	return isNaN(parseUnit(value)[0]) === false

}

/**
 * Parses an absolute value.
 * @param {String|Integer} value
 * @returns {Object} value - Parsed value.
 */
const parseAbsoluteValue = function(value) {

	const parsedValue = parseUnit(value)

	return {
		value: parsedValue[0],
		unit: parsedValue[1]
	}

}

/**
 * Checks if a value is relative.
 * A relative value must start and end with [a-z] and needs a '-' in the middle.
 * @param {String|Integer} value
 * @returns {Boolean} isRelative
 */
const isRelativeValue = function(value) {

	return String(value).match(/^[a-z]+-[a-z]+$/) !== null

}

/**
 * Returns the property that should be used according to direct.
 * @param {Boolean|Node} direct
 * @param {Object} properties
 * @returns {*}
 */
const mapDirectToProperty = function(direct, properties) {

	if (direct === true) return properties.elem
	if (direct instanceof HTMLElement === true) return properties.direct

	return properties.global

}

/**
 * Converts a relative value to an absolute value.
 * @param {String} value
 * @param {Node} elem - Anchor of the relative value.
 * @param {?Integer} scrollTop - Pixels scrolled in document.
 * @param {?Integer} viewportHeight - Height of the viewport.
 * @returns {String} value - Absolute value.
 */
const relativeToAbsoluteValue = function(value, elem, scrollTop = getScrollTop(), viewportHeight = getViewportHeight()) {

	const elemSize = elem.getBoundingClientRect()

	const elemAnchor = value.match(/^[a-z]+/)[0]
	const viewportAnchor = value.match(/[a-z]+$/)[0]

	let y = 0

	if (viewportAnchor === 'top') y -= 0
	if (viewportAnchor === 'middle') y -= viewportHeight / 2
	if (viewportAnchor === 'bottom') y -= viewportHeight

	if (elemAnchor === 'top') y += (elemSize.top + scrollTop)
	if (elemAnchor === 'middle') y += (elemSize.top + scrollTop) + elemSize.height / 2
	if (elemAnchor === 'bottom') y += (elemSize.top + scrollTop) + elemSize.height

	return `${ y }px`

}

/**
 * Validates data and sets defaults for undefined properties.
 * @param {?Object} data
 * @returns {Object} data - Validated data.
 */
const validate = function(data = {}) {

	// Copy root object to avoid changes by reference
	data = Object.assign({}, data)

	if (data.inside == null) data.inside = () => {}
	if (data.outside == null) data.outside = () => {}
	if (data.direct == null) data.direct = false
	if (data.track == null) data.track = true
	if (data.props == null) data.props = {}

	if (data.from == null) throw new Error('Missing property `from`')
	if (data.to == null) throw new Error('Missing property `to`')
	if (typeof data.inside !== 'function') throw new Error('Property `inside` must be undefined or a function')
	if (typeof data.outside !== 'function') throw new Error('Property `outside` must be undefined or a function')
	if (typeof data.direct !== 'boolean' && data.direct instanceof HTMLElement === false) throw new Error('Property `direct` must be undefined, a boolean or a DOM element/node')
	if (data.direct === true && data.elem == null) throw new Error('Property `elem` is required when `direct` is true')
	if (typeof data.track !== 'boolean') throw new Error('Property `track` must be undefined or a boolean')
	if (typeof data.props !== 'object') throw new Error('Property `props` must be undefined or an object')

	if (data.elem == null) {

		if (isAbsoluteValue(data.from) === false) throw new Error('Property `from` must be a absolute value when no `elem` has been provided')
		if (isAbsoluteValue(data.to) === false) throw new Error('Property `to` must be a absolute value when no `elem` has been provided')

	} else {

		if (isRelativeValue(data.from) === true) data.from = relativeToAbsoluteValue(data.from, data.elem)
		if (isRelativeValue(data.to) === true) data.to = relativeToAbsoluteValue(data.to, data.elem)

	}

	data.from = parseAbsoluteValue(data.from)
	data.to = parseAbsoluteValue(data.to)

	// Create a new props object to avoid changes by reference
	data.props = Object.keys(data.props).reduce((acc, key) => {

		// Copy prop object to avoid changes by reference
		const prop = Object.assign({}, data.props[key])

		if (isAbsoluteValue(prop.from) === false) throw new Error('Property `from` of prop must be a absolute value')
		if (isAbsoluteValue(prop.to) === false) throw new Error('Property `from` of prop must be a absolute value')

		prop.from = parseAbsoluteValue(prop.from)
		prop.to = parseAbsoluteValue(prop.to)

		if (prop.timing == null) prop.timing = eases['linear']

		if (typeof prop.timing !== 'string' && typeof prop.timing !== 'function') throw new Error('Property `timing` of prop must be undefined, a string or a function')

		if (typeof prop.timing === 'string' && eases[prop.timing] == null) throw new Error('Unknown timing for property `timing` of prop')
		if (typeof prop.timing === 'string') prop.timing = eases[prop.timing]

		acc[key] = prop

		return acc

	}, {})

	return data

}

/**
 * Calculates the props of an instance.
 * @param {Object} instance
 * @param {?Integer} scrollTop - Pixels scrolled in document.
 * @returns {Object} Calculated props and the element to apply styles to.
 */
const getProps = function(instance, scrollTop = getScrollTop()) {

	const data = instance.getData()

	// 100% in pixel
	const total = data.to.value - data.from.value

	// Pixel scrolled
	const current = scrollTop - data.from.value

	// Percent scrolled
	const precisePercentage = current / (total / 100)
	const normalizedPercentage = Math.min(Math.max(precisePercentage, 0), 100)

	// Get the element that should be used according to direct
	const elem = mapDirectToProperty(data.direct, {
		global: document.documentElement,
		elem: data.elem,
		direct: data.direct
	})

	// Generate an object with all new props
	const props = Object.keys(data.props).reduce((acc, key) => {

		const prop = data.props[key]

		// Use the unit of from OR to. It's valid to animate from '0' to '100px' and
		// '0' should be treated as 'px', too. Unit will be an empty string when no unit given.
		const unit = prop.from.unit || prop.to.unit

		// The value that should be interpolated
		const diff = prop.from.value - prop.to.value

		// All easing functions only remap a time value, and all have the same signature.
		// Typically a value between 0 and 1, and it returns a new float that has been eased.
		const time = prop.timing(normalizedPercentage / 100)

		const value = prop.from.value - diff * time

		// Round to avoid unprecise values.
		// The precision of floating point computations is only as precise as the precision it uses.
		// http://stackoverflow.com/questions/588004/is-floating-point-math-broken
		const rounded = Math.round(value * 10000) / 10000

		acc[key] = rounded + unit

		return acc

	}, {})

	// Use precise percentage to check if the viewport is between from and to.
	// Would always return true when using the normalized percentage.
	const isInside = (precisePercentage >= 0 && precisePercentage <= 100)
	const isOutside = (precisePercentage < 0 || precisePercentage > 100)

	// Execute callbacks
	if (isInside === true) data.inside(instance, precisePercentage, props)
	if (isOutside === true) data.outside(instance, precisePercentage, props)

	return {
		elem,
		props
	}

}

/**
 * Adds a property with the specified name and value to a given style object.
 * @param {Node} elem - Styles will be applied to this element.
 * @param {Object} prop - Object with a key and value.
 */
const setProp = function(elem, prop) {

	elem.style.setProperty(prop.key, prop.value)

}

/**
 * Adds properties to a given style object.
 * @param {Node} elem - Styles will be applied to this element.
 * @param {Object} props - Object of props.
 */
const setProps = function(elem, props) {

	Object.keys(props).forEach((key) => setProp(elem, {
		key: key,
		value: props[key]
	}))

}

/**
 * Gets and sets new props when the user has scrolled and when there are active instances.
 * This part get executed with every frame. Make sure it's performant as hell.
 * @param {Object} style - Style object.
 * @param {?Integer} previousScrollTop
 * @returns {?*}
 */
const loop = function(style, previousScrollTop) {

	// Continue loop
	const repeat = () => {

		// It depends on the browser, but it turns out that closures
		// are sometimes faster than .bind or .apply.
		requestAnimationFrame(() => loop(style, previousScrollTop))

	}

	// Get all active instances
	const activeInstances = getActiveInstances(instances)

	// Only continue when active instances available
	if (activeInstances.length === 0) return repeat()

	const scrollTop = getScrollTop()

	// Only continue when scrollTop has changed
	if (previousScrollTop === scrollTop) return repeat()
	else previousScrollTop = scrollTop

	// Get and set new props of each instance
	activeInstances
		.map((instance) => getProps(instance, scrollTop))
		.forEach(({ elem, props }) => setProps(elem, props))

	repeat()

}

/**
 * Creates a new instance.
 * @param {Object} data
 * @returns {Object} instance
 */
export const create = function(data) {

	// Store the parsed data
	let _data = null

	// Store if instance is started or stopped
	let active = false

	// Returns if instance is started or stopped
	const _isActive = () => {

		return active

	}

	// Returns the parsed and calculated data
	const _getData = function() {

		return _data

	}

	// Parses and calculates data
	const _calculate = function() {

		_data = validate(data)

	}

	// Update props
	const _update = () => {

		// Get new props
		const { elem, props } = getProps(instance)

		// Set new props
		setProps(elem, props)

		return props

	}

	// Starts to animate
	const _start = () => {

		active = true

	}

	// Stops to animate
	const _stop = () => {

		active = false

	}

	// Destroys the instance
	const _destroy = () => {

		// Replace instance instead of deleting the item to avoid
		// that the index of other instances changes.
		instances[index] = undefined

	}

	// Assign instance to a variable so the instance can be used
	// elsewhere in the current function.
	const instance = {
		isActive: _isActive,
		getData: _getData,
		calculate: _calculate,
		update: _update,
		start: _start,
		stop: _stop,
		destroy: _destroy
	}

	// Store instance in global array and save the index
	const index = instances.push(instance) - 1

	// Calculate data for the first time
	instance.calculate()

	return instance

}

// Only run basicScroll when executed in a browser environment

if (isBrowser === true) {

	// Start to loop
	loop()

	// Recalculate and update instances when the window size changes
	window.addEventListener('resize', debounce(() => {

		// Get all tracked instances
		const trackedInstances = getTrackedInstances(instances)

		trackedInstances.forEach((instance) => {
			instance.calculate()
			instance.update()
		})

	}, 50))

} else {

	console.warn('basicScroll is not executing because you are using it in an environment without a `window` object')

}



























































//Get Elements
const nav = document.getElementById('navigation');
const navToggle = document.getElementById('navtoggle');
const navMain = document.querySelector('.navigation-main-container');
const navAltToggle = document.querySelectorAll('.nav-alt-toggle'); 
const navLi = document.querySelectorAll('.navigation-li');

const navIconLineOne = document.querySelector('.sidebar-nav-icon-line-1');
const navIconLineTwo = document.querySelector('.sidebar-nav-icon-line-2');
const navIconLineBorder = document.querySelector('.sidebar-nav-icon-border');
const navDiagonals = document.querySelector('.navigation-svg-container');

const titleDefault = document.querySelector('.title-default');
const titleHover = document.querySelector('.title-hover');

const h5Original = document.querySelector('.original');
const h5Secondary = document.querySelector('.secondary');

let navToggleTracker = false; //TODO: I think this isn't right
let buttonDisable = false; //TODO: I think this isn't right
let leftNav = false;

window.onload = function () {
    generatePortfolioImgSquare(-100, 40); //TODO: why negative?
}

//title hover
titleDefault.addEventListener('mouseenter', function () {
    titleHover.classList.add('fade-in-anim');
});
titleDefault.addEventListener('mouseleave', function () {
    titleHover.classList.remove('fade-in-anim');
});

//main navigation listener
navToggle.addEventListener('mouseenter', function () {
    if (!navToggleTracker && !buttonDisable) {
        buttonDisable = true;
        showNav();
        setTimeout(function () {
            buttonDisable = false;
        }, 1000);
    }
    else {
        console.log("standard nav close");
        hideNavCheck();
    }
});

// REMOVED
// edgecase nav, if you hover back while the button is disabled, it will close after x seconds
// navToggle.addEventListener('mousemove', function () {
//     console.log('mousemove');
//     hoverNavFallback();
// });

//makes it so that if you hover over the button while reading the main text, you must hover out to hoverNavFallback
navToggle.addEventListener('mouseleave', function () {
    leftNav = true;
});

// sidebar navigation listener
for (let i = 0; i < navAltToggle.length; i++){
    navAltToggle[i].addEventListener('mouseenter', function () { hideNavCheck(); });
    navAltToggle[i].addEventListener('mouseover', function () { hoverNavFallback(); });
}

let hoverNavFallback = () => {
    if (!buttonDisable && leftNav) {
        console.log("fallback navigation initiated");
        hideNavCheck();
    }
}

let hideNavCheck = () => {
    if (navToggleTracker && !buttonDisable) {
        hideNav()
    }
}

const showNav = () => {
    navToggleTracker = true;
    nav.classList.remove('navigation-hide');
    nav.classList.add('navigation-show');

    //bg fadein animation
    nav.classList.remove('navigation-animation-bg-fadeout');
    nav.classList.add('navigation-animation-bg-fadein');
    nav.style.backgroundColor = ('rgba(35,31,32,.95)'); // ??? WHY?

    navIconLineOne.classList.add('svg1animation');
    navIconLineTwo.classList.add('svg1animation');
    navIconLineBorder.classList.add('svg2animation');
    setTimeout(function () {
        navMain.classList.add('navigation-animation');
        navDiagonals.classList.add('diagonal-rectangle-navigation');
        for (let i = 0; i < navLi.length; i++){
            navLi[i].classList.add('navigation-li-animation');
        }
    }, 10);
}

const hideNav = () => {
    navToggleTracker = false;
    leftNav = false; //sets fallback to false

    //bg fadeout animation
    nav.classList.remove('navigation-animation-bg-fadein');
    nav.classList.add('navigation-animation-bg-fadeout');
    nav.style.backgroundColor = ('rgba(0, 0, 0, 0)'); // ??? WHY?

    navIconLineTwo.classList.remove('svg1animation');
    navIconLineOne.classList.remove('svg1animation');
    navIconLineBorder.classList.remove('svg2animation');
    navMain.classList.remove('navigation-animation');
    navDiagonals.classList.remove('diagonal-rectangle-navigation');

    for (let i = 0; i < navLi.length; i++){
        navLi[i].classList.remove('navigation-li-animation');
    }
    setTimeout(function () {
        nav.classList.add('navigation-hide');
        nav.classList.remove('navigation-show');
    }, 800);
}

const scrollContainer = document.querySelector('.portfolio');
const horizontalScroll = () => {
    let h5 = document.getElementsByTagName("h5")[0];
    if (window.pageXOffset >= 500) {
        console.log("scroll successful");
        h5Secondary.classList.add('fade-in-anim');
    }
    if (window.pageXOffset < 500) {
        h5.textContent = "To Portfolio Home";
    }
}; 
window.addEventListener("scroll", horizontalScroll);

const portfolioImgSquare = document.querySelectorAll('.portfolio-img-square');
const portfolioImg = document.querySelectorAll('.portfolio-img');

const calcImgRightEdge = () => {
    portfolioImg[1].offsetWidth
}


const generatePortfolioImgSquare = (topRand, leftRand) => {
    
    
    let runCount = 0
    for (let i = 0; i < portfolioImgSquare.length; i++) {   
        const result = randomGenerationSquare(topRand, leftRand, runCount);
        console.log(result);
        runCount++
        let plusOrMinus = Math.round(Math.random()) * 2 - 1; //TODO: repeat var

        portfolioImgSquare[i].style.top = `${result.top}px`;

        plusOrMinus === 1 ? portfolioImgSquare[i].style.left = `${result.leftOrRight}px` : portfolioImgSquare[i].style.right = `${result.leftOrRight}px`;
        portfolioImgSquare[i].style.width = `${result.width}px`;
        portfolioImgSquare[i].style.height = `${result.height}px`;
        portfolioImgSquare[i].style.backgroundColor = ('rgba(255, 255, 255, 0.04)');

        // if (portfolioImgSquare[i].getBoundingClientRect().right < portfolioImg[i].getBoundingClientRect().right + 50) {
        //     console.log(`portfolioImgSquare is too far to the right!`);
        // }
    }
}

const randomGenerationSquare = (topRand, leftRand, runCount) => {
    let coords = {
        top: '',
        leftOrRight: '',
        width: '',
        height: ''
    }

    const min = 20;
    let plusOrMinus = Math.round(Math.random()) * 2 - 1;

    const top = Math.floor(Math.min(Math.random() * topRand), min) * plusOrMinus;
    let leftOrRight = Math.floor(Math.random() * leftRand) * plusOrMinus;
    
    //normalize LeftOrRight
    //TODO: Can probably do this with a clamp
    if (leftOrRight < 0 && leftOrRight > -20) {
        console.log(`Adjusting leftOrRight... from min value`);
        leftOrRight === -20;
        console.log(`${leftOrRight} is the value of leftOrRight`)
    }
    else if (leftOrRight > 0 && leftOrRight < 20) {
        console.log(`Adjusting leftOrRight...`);
        leftOrRight === 20;
        console.log(`${leftOrRight} is the value of leftOrRight`)
    }

    const height = portfolioImg[runCount].getBoundingClientRect().height + 50 - (Math.floor(Math.min(Math.random() * 200), min));
    const width = portfolioImg[runCount].getBoundingClientRect().width - (Math.floor(Math.min(Math.random() * 200), min));
    coords.top = top;
    coords.leftOrRight = leftOrRight;
    coords.height = height;
    coords.width = width;
    console.log(`this ran ${runCount} times`);
    // console.log(`${leftOrRight} is the value of leftOrRight`)
    return coords;
}


// Parallax Scroll Code



document.querySelectorAll('.portfolio-parallax').forEach((elem) => {

    const modifier = elem.getAttribute('data-modifier')
    
    basicScroll.create({
      elem: elem,
      from: 0,
      to: 519,
      props: {
        '--translateY': {
          from: '0',
          to: `${ 10 * modifier }px`,
          direct: true
        }
      }
    }).start()
    
  })