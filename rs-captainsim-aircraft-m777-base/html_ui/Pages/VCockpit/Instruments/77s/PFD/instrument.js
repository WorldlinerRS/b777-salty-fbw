/**
 * Types of subscribable array change event.
 */
var SubscribableArrayEventType;
(function (SubscribableArrayEventType) {
    /** An element was added. */
    SubscribableArrayEventType["Added"] = "Added";
    /** An element was removed. */
    SubscribableArrayEventType["Removed"] = "Removed";
    /** The array was cleared. */
    SubscribableArrayEventType["Cleared"] = "Cleared";
})(SubscribableArrayEventType || (SubscribableArrayEventType = {}));
/**
 * An abstract implementation of a subscribable which allows adding, removing, and notifying subscribers.
 */
class AbstractSubscribable {
    constructor() {
        this.subs = [];
    }
    /** @inheritdoc */
    sub(fn, initialNotify) {
        this.subs.push(fn);
        if (initialNotify) {
            fn(this.get());
        }
    }
    /** @inheritdoc */
    unsub(fn) {
        const index = this.subs.indexOf(fn);
        if (index >= 0) {
            this.subs.splice(index, 1);
        }
    }
    /**
     * Notifies subscribers that this subscribable's value has changed.
     */
    notify() {
        const subLen = this.subs.length;
        for (let i = 0; i < subLen; i++) {
            try {
                this.subs[i](this.get());
            }
            catch (error) {
                console.error(`AbstractSubscribable: error in handler: ${error}`);
                if (error instanceof Error) {
                    console.error(error.stack);
                }
            }
        }
    }
}
/**
 * Checks if two values are equal using the strict equality operator.
 * @param a The first value.
 * @param b The second value.
 * @returns whether a and b are equal.
 */
AbstractSubscribable.DEFAULT_EQUALITY_FUNC = (a, b) => a === b;

/**
 * A subscribable subject whose value can be freely manipulated.
 */
class Subject extends AbstractSubscribable {
    /**
     * Constructs an observable Subject.
     * @param value The initial value.
     * @param equalityFunc The function to use to check for equality.
     * @param mutateFunc The function to use to mutate the subject's value.
     */
    constructor(value, equalityFunc, mutateFunc) {
        super();
        this.value = value;
        this.equalityFunc = equalityFunc;
        this.mutateFunc = mutateFunc;
    }
    /**
     * Creates and returns a new Subject.
     * @param v The initial value of the subject.
     * @param equalityFunc The function to use to check for equality between subject values. Defaults to the strict
     * equality comparison (`===`).
     * @param mutateFunc The function to use to change the subject's value. If not defined, new values will replace
     * old values by variable assignment.
     * @returns A Subject instance.
     */
    static create(v, equalityFunc, mutateFunc) {
        return new Subject(v, equalityFunc !== null && equalityFunc !== void 0 ? equalityFunc : Subject.DEFAULT_EQUALITY_FUNC, mutateFunc);
    }
    /**
     * Sets the value of this subject and notifies subscribers if the value changed.
     * @param value The new value.
     */
    set(value) {
        if (!this.equalityFunc(value, this.value)) {
            if (this.mutateFunc) {
                this.mutateFunc(this.value, value);
            }
            else {
                this.value = value;
            }
            this.notify();
        }
    }
    /**
     * Applies a partial set of properties to this subject's value and notifies subscribers if the value changed as a
     * result.
     * @param value The properties to apply.
     */
    apply(value) {
        let changed = false;
        for (const prop in value) {
            changed = value[prop] !== this.value[prop];
            if (changed) {
                break;
            }
        }
        Object.assign(this.value, value);
        changed && this.notify();
    }
    /** @inheritdoc */
    notify() {
        super.notify();
    }
    /**
     * Gets the value of this subject.
     * @returns The value of this subject.
     */
    get() {
        return this.value;
    }
    // eslint-disable-next-line jsdoc/require-jsdoc
    map(fn, equalityFunc, mutateFunc, initialVal) {
        const mapFunc = (inputs, previousVal) => fn(inputs[0], previousVal);
        return mutateFunc
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            ? MappedSubject.create(mapFunc, equalityFunc, mutateFunc, initialVal, this)
            : MappedSubject.create(mapFunc, equalityFunc !== null && equalityFunc !== void 0 ? equalityFunc : AbstractSubscribable.DEFAULT_EQUALITY_FUNC, this);
    }
}
/**
 * A subscribable subject that is a mapped stream from one or more input subscribables.
 */
class MappedSubject extends AbstractSubscribable {
    /**
     * Creates a new MappedSubject.
     * @param mapFunc The function which maps this subject's inputs to a value.
     * @param equalityFunc The function which this subject uses to check for equality between values.
     * @param mutateFunc The function which this subject uses to change its value.
     * @param initialVal The initial value of this subject.
     * @param inputs The subscribables which provide the inputs to this subject.
     */
    constructor(mapFunc, equalityFunc, mutateFunc, initialVal, ...inputs) {
        super();
        this.mapFunc = mapFunc;
        this.equalityFunc = equalityFunc;
        this.inputs = inputs;
        this.inputValues = inputs.map(input => input.get());
        if (initialVal && mutateFunc) {
            this.value = initialVal;
            mutateFunc(this.value, this.mapFunc(this.inputValues));
            this.mutateFunc = (newVal) => { mutateFunc(this.value, newVal); };
        }
        else {
            this.value = this.mapFunc(this.inputValues);
            this.mutateFunc = (newVal) => { this.value = newVal; };
        }
        this.inputHandlers = this.inputs.map((input, index) => this.updateValue.bind(this, index));
        for (let i = 0; i < inputs.length; i++) {
            inputs[i].sub(this.inputHandlers[i]);
        }
    }
    // eslint-disable-next-line jsdoc/require-jsdoc
    static create(mapFunc, ...args) {
        let equalityFunc, mutateFunc, initialVal;
        if (typeof args[0] === 'function') {
            equalityFunc = args.shift();
        }
        else {
            equalityFunc = MappedSubject.DEFAULT_EQUALITY_FUNC;
        }
        if (typeof args[0] === 'function') {
            mutateFunc = args.shift();
            initialVal = args.shift();
        }
        return new MappedSubject(mapFunc, equalityFunc, mutateFunc, initialVal, ...args);
    }
    /**
     * Updates an input value, then re-maps this subject's value, and notifies subscribers if this results in a change to
     * the mapped value according to this subject's equality function.
     * @param index The index of the input value to update.
     */
    updateValue(index) {
        this.inputValues[index] = this.inputs[index].get();
        const value = this.mapFunc(this.inputValues, this.value);
        if (!this.equalityFunc(this.value, value)) {
            this.mutateFunc(value);
            this.notify();
        }
    }
    /**
     * Gets the current value of the subject.
     * @returns The current value.
     */
    get() {
        return this.value;
    }
    /**
     * Destroys the subscription to the parent subscribable.
     */
    destroy() {
        for (let i = 0; i < this.inputs.length; i++) {
            this.inputs[i].unsub(this.inputHandlers[i]);
        }
    }
    // eslint-disable-next-line jsdoc/require-jsdoc
    map(fn, equalityFunc, mutateFunc, initialVal) {
        const mapFunc = (inputs, previousVal) => fn(inputs[0], previousVal);
        return new MappedSubject(mapFunc, equalityFunc !== null && equalityFunc !== void 0 ? equalityFunc : MappedSubject.DEFAULT_EQUALITY_FUNC, mutateFunc, initialVal, this);
    }
}

/**
 * A class for subjects that return a computed value.
 * @class ComputedSubject
 * @template I The type of the input value.
 * @template T The type of the computed output value.
 */
class ComputedSubject {
    /**
     * Creates an instance of ComputedSubject.
     * @param value The initial value.
     * @param computeFn The computation function.
     */
    constructor(value, computeFn) {
        this.computeFn = computeFn;
        this._subs = [];
        this._value = value;
        this._computedValue = computeFn(value);
    }
    /**
     * Creates and returns a new ComputedSubject.
     * @param v The initial value of the Subject.
     * @param fn A function which transforms raw values to computed values.
     * @returns A ComputedSubject instance.
     */
    static create(v, fn) {
        return new ComputedSubject(v, fn);
    }
    /**
     * Sets the new value and notifies the subscribers when value changed.
     * @param value The new value.
     */
    set(value) {
        this._value = value;
        const compValue = this.computeFn(value);
        if (compValue !== this._computedValue) {
            this._computedValue = compValue;
            const subLen = this._subs.length;
            for (let i = 0; i < subLen; i++) {
                this._subs[i](this._computedValue, this._value);
            }
        }
    }
    /**
     * Gets the computed value of the Subject.
     * @returns The computed value.
     */
    get() {
        return this._computedValue;
    }
    /**
     * Gets the raw value of the Subject.
     * @returns The raw value.
     */
    getRaw() {
        return this._value;
    }
    /**
     * Subscribes to the subject with a callback function. The function will be called whenever the computed value of
     * this Subject changes.
     * @param fn A callback function.
     * @param initialNotify Whether to immediately notify the callback function with the current compured and raw values
     * of this Subject after it is subscribed. False by default.
     */
    sub(fn, initialNotify) {
        this._subs.push(fn);
        if (initialNotify) {
            fn(this._computedValue, this._value);
        }
    }
    /**
     * Unsubscribes a callback function from this Subject.
     * @param fn The callback function to unsubscribe.
     */
    unsub(fn) {
        const index = this._subs.indexOf(fn);
        if (index >= 0) {
            this._subs.splice(index, 1);
        }
    }
    // eslint-disable-next-line jsdoc/require-jsdoc
    map(fn, equalityFunc, mutateFunc, initialVal) {
        const mapFunc = (inputs, previousVal) => fn(inputs[0], previousVal);
        return mutateFunc
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            ? MappedSubject.create(mapFunc, equalityFunc, mutateFunc, initialVal, this)
            : MappedSubject.create(mapFunc, equalityFunc !== null && equalityFunc !== void 0 ? equalityFunc : AbstractSubscribable.DEFAULT_EQUALITY_FUNC, this);
    }
}

/* eslint-disable no-inner-declarations */
/** A releative render position. */
var RenderPosition;
(function (RenderPosition) {
    RenderPosition[RenderPosition["Before"] = 0] = "Before";
    RenderPosition[RenderPosition["After"] = 1] = "After";
    RenderPosition[RenderPosition["In"] = 2] = "In";
})(RenderPosition || (RenderPosition = {}));
/**
 * A display component in the component framework.
 * @typedef P The type of properties for this component.
 * @typedef C The type of context that this component might have.
 */
class DisplayComponent {
    /**
     * Creates an instance of a DisplayComponent.
     * @param props The propertis of the component.
     */
    constructor(props) {
        /** The context on this component, if any. */
        this.context = undefined;
        /** The type of context for this component, if any. */
        this.contextType = undefined;
        this.props = props;
    }
    /**
     * A callback that is called before the component is rendered.
     */
    onBeforeRender() { return; }
    /**
     * A callback that is called after the component is rendered.
     * @param node The component's VNode.
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onAfterRender(node) { return; }
    /**
     * Destroys this component.
     */
    destroy() { return; }
    /**
     * Gets a context data subscription from the context collection.
     * @param context The context to get the subscription for.
     * @returns The requested context.
     * @throws An error if no data for the specified context type could be found.
     */
    getContext(context) {
        if (this.context !== undefined && this.contextType !== undefined) {
            const index = this.contextType.indexOf(context);
            return this.context[index];
        }
        throw new Error('Could not find the provided context type.');
    }
}
/**
 * A reference to a component or element node.
 */
class NodeReference {
    constructor() {
        /** The internal reference instance. */
        this._instance = null;
    }
    /**
     * The instance of the element or component.
     * @returns The instance of the element or component.
     */
    get instance() {
        if (this._instance !== null) {
            return this._instance;
        }
        throw new Error('Instance was null.');
    }
    /**
     * Sets the value of the instance.
     */
    set instance(val) {
        this._instance = val;
    }
    /**
     * Gets the instance, or null if the instance is not populated.
     * @returns The component or element instance.
     */
    getOrDefault() {
        return this._instance;
    }
}
/**
 * Provides a context of data that can be passed down to child components via a provider.
 */
class Context {
    /**
     * Creates an instance of a Context.
     * @param defaultValue The default value of this context.
     */
    constructor(defaultValue) {
        this.defaultValue = defaultValue;
        /**
         * The provider component that can be set to a specific context value.
         * @param props The props of the provider component.
         * @returns A new context provider.
         */
        this.Provider = (props) => new ContextProvider(props, this);
    }
}
/**
 * A provider component that can be set to a specific context value.
 */
class ContextProvider extends DisplayComponent {
    /**
     * Creates an instance of a ContextProvider.
     * @param props The props on the component.
     * @param parent The parent context instance for this provider.
     */
    constructor(props, parent) {
        super(props);
        this.parent = parent;
    }
    /** @inheritdoc */
    render() {
        var _a;
        const children = (_a = this.props.children) !== null && _a !== void 0 ? _a : [];
        return FSComponent.buildComponent(FSComponent.Fragment, this.props, ...children);
    }
}
/**
 * The FS component namespace.
 */
// eslint-disable-next-line @typescript-eslint/no-namespace
var FSComponent;
(function (FSComponent) {
    /**
     * Valid SVG element tags.
     */
    const svgTags = {
        'circle': true,
        'clipPath': true,
        'color-profile': true,
        'cursor': true,
        'defs': true,
        'desc': true,
        'ellipse': true,
        'g': true,
        'image': true,
        'line': true,
        'linearGradient': true,
        'marker': true,
        'mask': true,
        'path': true,
        'pattern': true,
        'polygon': true,
        'polyline': true,
        'radialGradient': true,
        'rect': true,
        'stop': true,
        'svg': true,
        'text': true
    };
    /**
     * A fragment of existing elements with no specific root.
     * @param props The fragment properties.
     * @returns The fragment children.
     */
    function Fragment(props) {
        return props.children;
    }
    FSComponent.Fragment = Fragment;
    /**
     * Builds a JSX based FSComponent.
     * @param type The DOM element tag that will be built.
     * @param props The properties to apply to the DOM element.
     * @param children Any children of this DOM element.
     * @returns The JSX VNode for the component or element.
     */
    // eslint-disable-next-line no-inner-declarations
    function buildComponent(type, props, ...children) {
        let vnode = null;
        if (typeof type === 'string') {
            let element;
            if (svgTags[type] !== undefined) {
                element = document.createElementNS('http://www.w3.org/2000/svg', type);
            }
            else {
                element = document.createElement(type);
            }
            if (props !== null) {
                for (const key in props) {
                    if (key === 'ref' && props.ref !== undefined) {
                        props.ref.instance = element;
                    }
                    else {
                        const prop = props[key];
                        if (prop instanceof Subject || prop instanceof MappedSubject || prop instanceof ComputedSubject) {
                            element.setAttribute(key, prop.get());
                            prop.sub((v) => {
                                element.setAttribute(key, v);
                            });
                        }
                        else {
                            element.setAttribute(key, prop);
                        }
                    }
                }
            }
            vnode = {
                instance: element,
                props: props,
                children: null
            };
            vnode.children = createChildNodes(vnode, children);
        }
        else if (typeof type === 'function') {
            if (children !== null && props === null) {
                props = {
                    children: children
                };
            }
            else if (props !== null) {
                props.children = children;
            }
            if (typeof type === 'function' && type.name === 'Fragment') {
                let childNodes = type(props);
                //Handle the case where the single fragment children is an array of nodes passsed down from above
                if (childNodes !== null && childNodes.length > 0 && Array.isArray(childNodes[0])) {
                    childNodes = childNodes[0];
                }
                vnode = {
                    instance: null,
                    props,
                    children: childNodes
                };
            }
            else {
                let instance;
                try {
                    instance = type(props);
                }
                catch (_a) {
                    instance = new type(props);
                }
                if (props !== null && props.ref !== null && props.ref !== undefined) {
                    props.ref.instance = instance;
                }
                if (instance.contextType !== undefined) {
                    instance.context = instance.contextType.map(c => Subject.create(c.defaultValue));
                }
                vnode = {
                    instance,
                    props,
                    children: [instance.render()]
                };
            }
        }
        return vnode;
    }
    FSComponent.buildComponent = buildComponent;
    /**
     * Creates the collection of child VNodes.
     * @param parent The parent VNode.
     * @param children The JSX children to convert to nodes.
     * @returns A collection of child VNodes.
     */
    function createChildNodes(parent, children) {
        let vnodes = null;
        if (children !== null && children !== undefined && children.length > 0) {
            vnodes = [];
            for (const child of children) {
                if (child !== null) {
                    if (child instanceof Subject || child instanceof MappedSubject || child instanceof ComputedSubject) {
                        const subjectValue = child.get().toString();
                        const node = {
                            instance: subjectValue === '' ? ' ' : subjectValue,
                            children: null,
                            props: null,
                            root: undefined,
                        };
                        child.sub((v) => {
                            if (node.root !== undefined) {
                                // TODO workaround. gotta find a solution for the text node vanishing when text is empty
                                node.root.nodeValue = v === '' ? ' ' : v.toString();
                            }
                        });
                        vnodes.push(node);
                    }
                    else if (child instanceof Array) {
                        const arrayNodes = createChildNodes(parent, child);
                        if (arrayNodes !== null) {
                            vnodes.push(...arrayNodes);
                        }
                    }
                    else if (typeof child === 'string' || typeof child === 'number') {
                        vnodes.push(createStaticContentNode(child));
                    }
                    else if (typeof child === 'object') {
                        vnodes.push(child);
                    }
                }
            }
        }
        return vnodes;
    }
    FSComponent.createChildNodes = createChildNodes;
    /**
     * Creates a static content VNode.
     * @param content The content to create a node for.
     * @returns A static content VNode.
     */
    function createStaticContentNode(content) {
        return {
            instance: content,
            children: null,
            props: null
        };
    }
    FSComponent.createStaticContentNode = createStaticContentNode;
    /**
     * Renders a VNode to a DOM element.
     * @param node The node to render.
     * @param element The DOM element to render to.
     * @param position The RenderPosition to put the item in.
     */
    function render(node, element, position = RenderPosition.In) {
        if (node.children && node.children.length > 0 && element !== null) {
            const componentInstance = node.instance;
            if (componentInstance !== null && componentInstance.onBeforeRender !== undefined) {
                componentInstance.onBeforeRender();
            }
            if (node.instance instanceof HTMLElement || node.instance instanceof SVGElement) {
                insertNode(node, position, element);
            }
            else {
                for (const child of node.children) {
                    insertNode(child, position, element);
                }
            }
            const instance = node.instance;
            if (instance instanceof ContextProvider) {
                visitNodes(node, (n) => {
                    const nodeInstance = n.instance;
                    if (nodeInstance !== null && nodeInstance.contextType !== undefined) {
                        const contextSlot = nodeInstance.contextType.indexOf(instance.parent);
                        if (contextSlot >= 0) {
                            if (nodeInstance.context === undefined) {
                                nodeInstance.context = [];
                            }
                            nodeInstance.context[contextSlot].set(instance.props.value);
                        }
                        if (nodeInstance instanceof ContextProvider && nodeInstance !== instance && nodeInstance.parent === instance.parent) {
                            return true;
                        }
                    }
                    return false;
                });
            }
            if (componentInstance !== null && componentInstance.onAfterRender !== undefined) {
                componentInstance.onAfterRender(node);
            }
        }
    }
    FSComponent.render = render;
    /**
     * Inserts a node into the DOM.
     * @param node The node to insert.
     * @param position The position to insert the node in.
     * @param element The element to insert relative to.
     */
    function insertNode(node, position, element) {
        var _a, _b, _c, _d, _e, _f;
        if (node.instance instanceof HTMLElement || node.instance instanceof SVGElement) {
            switch (position) {
                case RenderPosition.In:
                    element.appendChild(node.instance);
                    node.root = (_a = element.lastChild) !== null && _a !== void 0 ? _a : undefined;
                    break;
                case RenderPosition.Before:
                    element.insertAdjacentElement('beforebegin', node.instance);
                    node.root = (_b = element.previousSibling) !== null && _b !== void 0 ? _b : undefined;
                    break;
                case RenderPosition.After:
                    element.insertAdjacentElement('afterend', node.instance);
                    node.root = (_c = element.nextSibling) !== null && _c !== void 0 ? _c : undefined;
                    break;
            }
            if (node.children !== null) {
                for (const child of node.children) {
                    insertNode(child, RenderPosition.In, node.instance);
                }
            }
        }
        else if (typeof node.instance === 'string') {
            switch (position) {
                case RenderPosition.In:
                    element.insertAdjacentHTML('beforeend', node.instance);
                    node.root = (_d = element.lastChild) !== null && _d !== void 0 ? _d : undefined;
                    break;
                case RenderPosition.Before:
                    element.insertAdjacentHTML('beforebegin', node.instance);
                    node.root = (_e = element.previousSibling) !== null && _e !== void 0 ? _e : undefined;
                    break;
                case RenderPosition.After:
                    element.insertAdjacentHTML('afterend', node.instance);
                    node.root = (_f = element.nextSibling) !== null && _f !== void 0 ? _f : undefined;
                    break;
            }
        }
        else if (Array.isArray(node)) {
            for (let i = 0; i < node.length; i++) {
                render(node[i], element);
            }
        }
        else {
            render(node, element);
        }
    }
    /**
     * Render a node before a DOM element.
     * @param node The node to render.
     * @param element The element to render boeore.
     */
    function renderBefore(node, element) {
        render(node, element, RenderPosition.Before);
    }
    FSComponent.renderBefore = renderBefore;
    /**
     * Render a node after a DOM element.
     * @param node The node to render.
     * @param element The element to render after.
     */
    function renderAfter(node, element) {
        render(node, element, RenderPosition.After);
    }
    FSComponent.renderAfter = renderAfter;
    /**
     * Remove a previously rendered element.  Currently, this is just a simple
     * wrapper so that all of our high-level "component maniuplation" state is kept
     * in the FSComponent API, but it's not doing anything other than a simple
     * remove() on the element.   This can probably be enhanced.
     * @param element The element to remove.
     */
    function remove(element) {
        if (element !== null) {
            element.remove();
        }
    }
    FSComponent.remove = remove;
    /**
     * Creates a component or element node reference.
     * @returns A new component or element node reference.
     */
    function createRef() {
        return new NodeReference();
    }
    FSComponent.createRef = createRef;
    /**
     * Creates a new context to hold data for passing to child components.
     * @param defaultValue The default value of this context.
     * @returns A new context.
     */
    function createContext(defaultValue) {
        return new Context(defaultValue);
    }
    FSComponent.createContext = createContext;
    /**
     * Visits VNodes with a supplied visitor function within the given children tree.
     * @param node The node to visit.
     * @param visitor The visitor function to inspect VNodes with. Return true if the search should stop at the visited
     * node and not proceed any further down the node's children.
     * @returns True if the visitation should break, or false otherwise.
     */
    function visitNodes(node, visitor) {
        const stopVisitation = visitor(node);
        if (!stopVisitation && node.children !== null) {
            for (let i = 0; i < node.children.length; i++) {
                visitNodes(node.children[i], visitor);
            }
        }
        return true;
    }
    FSComponent.visitNodes = visitNodes;
    /**
     * An empty callback handler.
     */
    FSComponent.EmptyHandler = () => { return; };
})(FSComponent || (FSComponent = {}));
FSComponent.Fragment;

/**
 * A number with an associated unit. Each NumberUnit is created with a reference unit type,
 * which cannot be changed after instantiation. The reference unit type determines how the
 * value of the NumberUnit is internally represented. Each NumberUnit also maintains an
 * active unit type, which can be dynamically changed at any time.
 */
class NumberUnit {
    /**
     * Constructor.
     * @param number - the initial numeric value of the new NumberUnit.
     * @param unit - the unit type of the new NumberUnit.
     */
    constructor(number, unit) {
        this._number = number;
        this._unit = unit;
        this.readonly = new NumberUnitReadOnly(this);
    }
    /**
     * Gets this NumberUnit's numeric value.
     * @returns This NumberUnit's numeric value.
     */
    get number() {
        return this._number;
    }
    /**
     * Gets this NumberUnit's unit type.
     * @returns This NumberUnit's unit type.
     */
    get unit() {
        return this._unit;
    }
    /**
     * Converts a value to a numeric value with this NumberUnit's unit type.
     * @param value - the value.
     * @param unit - the unit type of the new value. Defaults to this NumberUnit's unit type. This argument is ignored if
     * value is a NumberUnit.
     * @returns the numeric of the value with this NumberUnit's unit type.
     */
    toNumberOfThisUnit(value, unit) {
        if ((typeof value !== 'number') && this.unit.canConvert(value.unit)) {
            return this.unit.convertFrom(value.number, value.unit);
        }
        if (typeof value === 'number' && (!unit || this.unit.canConvert(unit))) {
            return unit ? this.unit.convertFrom(value, unit) : value;
        }
        return undefined;
    }
    // eslint-disable-next-line jsdoc/require-jsdoc
    set(arg1, arg2) {
        const converted = this.toNumberOfThisUnit(arg1, arg2);
        if (converted !== undefined) {
            this._number = converted;
            return this;
        }
        throw new Error('Invalid unit conversion attempted.');
    }
    // eslint-disable-next-line jsdoc/require-jsdoc
    add(arg1, arg2, arg3) {
        const isArg2NumberUnit = arg2 instanceof NumberUnit;
        const converted = this.toNumberOfThisUnit(arg1, isArg2NumberUnit ? undefined : arg2);
        if (converted !== undefined) {
            let out = isArg2NumberUnit ? arg2 : arg3;
            if (out) {
                out.set(this.number + converted, this.unit);
            }
            else {
                out = this;
                this._number += converted;
            }
            return out;
        }
        throw new Error('Invalid unit conversion attempted.');
    }
    // eslint-disable-next-line jsdoc/require-jsdoc
    subtract(arg1, arg2, arg3) {
        const isArg2NumberUnit = arg2 instanceof NumberUnit;
        const converted = this.toNumberOfThisUnit(arg1, isArg2NumberUnit ? undefined : arg2);
        if (converted !== undefined) {
            let out = isArg2NumberUnit ? arg2 : arg3;
            if (out) {
                out.set(this.number - converted, this.unit);
            }
            else {
                out = this;
                this._number -= converted;
            }
            return out;
        }
        throw new Error('Invalid unit conversion attempted.');
    }
    // eslint-disable-next-line jsdoc/require-jsdoc
    scale(factor, out) {
        if (out) {
            return out.set(this.number * factor, this.unit);
        }
        else {
            this._number *= factor;
            return this;
        }
    }
    // eslint-disable-next-line jsdoc/require-jsdoc
    ratio(value, unit) {
        const converted = this.toNumberOfThisUnit(value, unit);
        if (converted) {
            return this.number / converted;
        }
        throw new Error('Invalid unit conversion attempted.');
    }
    // eslint-disable-next-line jsdoc/require-jsdoc
    abs(out) {
        if (out) {
            return out.set(Math.abs(this.number), this.unit);
        }
        else {
            this._number = Math.abs(this._number);
            return this;
        }
    }
    /**
     * Returns the numeric value of this NumberUnit after conversion to a specified unit.
     * @param unit The unit to which to convert.
     * @returns The converted numeric value.
     * @throws Error if this NumberUnit's unit type cannot be converted to the specified unit.
     */
    asUnit(unit) {
        return this.unit.convertTo(this.number, unit);
    }
    // eslint-disable-next-line jsdoc/require-jsdoc
    compare(value, unit) {
        const converted = this.toNumberOfThisUnit(value, unit);
        if (converted === undefined) {
            throw new Error('Invalid unit conversion attempted.');
        }
        const diff = this.number - converted;
        if (Math.abs(diff) < 1e-14) {
            return 0;
        }
        return Math.sign(diff);
    }
    // eslint-disable-next-line jsdoc/require-jsdoc
    equals(value, unit) {
        const converted = this.toNumberOfThisUnit(value, unit);
        if (converted === undefined) {
            return false;
        }
        const diff = this.number - converted;
        return Math.abs(diff) < 1e-14;
    }
    /**
     * Checks whether this NumberUnit has a numeric value of NaN.
     * @returns Whether this NumberUnit has a numeric value of NaN.
     */
    isNaN() {
        return isNaN(this.number);
    }
    /**
     * Copies this NumberUnit.
     * @returns A copy of this NumberUnit.
     */
    copy() {
        return new NumberUnit(this.number, this.unit);
    }
}
/**
 * A read-only interface for a WT_NumberUnit.
 */
class NumberUnitReadOnly {
    /**
     * Constructor.
     * @param source - the source of the new read-only NumberUnit.
     */
    constructor(source) {
        this.source = source;
    }
    /**
     * Gets this NumberUnit's numeric value.
     * @returns This NumberUnit's numeric value.
     */
    get number() {
        return this.source.number;
    }
    /**
     * Gets this NumberUnit's unit type.
     * @returns This NumberUnit's unit type.
     */
    get unit() {
        return this.source.unit;
    }
    // eslint-disable-next-line jsdoc/require-jsdoc
    add(arg1, arg2, arg3) {
        const isArg2NumberUnit = arg2 instanceof NumberUnit;
        const out = (isArg2NumberUnit ? arg2 : arg3);
        if (typeof arg1 === 'number') {
            return this.source.add(arg1, arg2, out);
        }
        else {
            return this.source.add(arg1, out);
        }
    }
    // eslint-disable-next-line jsdoc/require-jsdoc
    subtract(arg1, arg2, arg3) {
        const isArg2NumberUnit = arg2 instanceof NumberUnit;
        const out = (isArg2NumberUnit ? arg2 : arg3);
        if (typeof arg1 === 'number') {
            return this.source.subtract(arg1, arg2, out);
        }
        else {
            return this.source.subtract(arg1, out);
        }
    }
    /**
     * Scales this NumberUnit by a unit-less factor and returns the result.
     * @param factor The factor by which to scale.
     * @param out The NumberUnit to which to write the result.
     * @returns The scaled value.
     */
    scale(factor, out) {
        return this.source.scale(factor, out);
    }
    // eslint-disable-next-line jsdoc/require-jsdoc
    ratio(arg1, arg2) {
        if (typeof arg1 === 'number') {
            return this.source.ratio(arg1, arg2);
        }
        else {
            return this.source.ratio(arg1);
        }
    }
    /**
     * Calculates the absolute value of this NumberUnit and returns the result.
     * @param out The NumberUnit to which to write the result.
     * @returns The absolute value.
     */
    abs(out) {
        return this.source.abs(out);
    }
    /**
     * Returns the numeric value of this NumberUnit after conversion to a specified unit.
     * @param unit The unit to which to convert.
     * @returns The converted numeric value.
     * @throws Error if this NumberUnit's unit type cannot be converted to the specified unit.
     */
    asUnit(unit) {
        return this.source.asUnit(unit);
    }
    // eslint-disable-next-line jsdoc/require-jsdoc
    compare(arg1, arg2) {
        if (typeof arg1 === 'number') {
            return this.source.compare(arg1, arg2);
        }
        else {
            return this.source.compare(arg1);
        }
    }
    // eslint-disable-next-line jsdoc/require-jsdoc
    equals(arg1, arg2) {
        if (typeof arg1 === 'number') {
            return this.source.equals(arg1, arg2);
        }
        else {
            return this.source.equals(arg1);
        }
    }
    /**
     * Checks whether this NumberUnit has a numeric value of NaN.
     * @returns Whether this NumberUnit has a numeric value of NaN.
     */
    isNaN() {
        return this.source.isNaN();
    }
    /**
     * Copies this NumberUnit.
     * @returns A copy of this NumberUnit.
     */
    copy() {
        return this.source.copy();
    }
}
/**
 * A unit of measurement.
 */
class AbstractUnit {
    /**
     * Constructor.
     * @param name The name of this unit.
     */
    constructor(name) {
        this.name = name;
    }
    /** @inheritdoc */
    canConvert(otherUnit) {
        return this.family === otherUnit.family;
    }
    /** @inheritdoc */
    createNumber(value) {
        return new NumberUnit(value, this);
    }
    /** @inheritdoc */
    equals(other) {
        return this.family === other.family && this.name === other.name;
    }
}
/**
 * A unit that can be converted to another unit of the same type via a fixed linear transformation.
 */
class SimpleUnit extends AbstractUnit {
    /**
     * Constructor.
     * @param family The family to which this unit belongs.
     * @param name The name of this unit.
     * @param scaleFactor The relative linear scale of the new unit compared to the standard unit of the same family.
     * @param zeroOffset The zero offset of the new unit compared to the standard unit of the same family.
     */
    constructor(family, name, scaleFactor, zeroOffset = 0) {
        super(name);
        this.family = family;
        this.scaleFactor = scaleFactor;
        this.zeroOffset = zeroOffset;
    }
    /** @inheritdoc */
    canConvert(otherUnit) {
        return otherUnit instanceof SimpleUnit && super.canConvert(otherUnit);
    }
    /** @inheritdoc */
    convertTo(value, toUnit) {
        if (!this.canConvert(toUnit)) {
            throw new Error(`Invalid conversion from ${this.name} to ${toUnit.name}.`);
        }
        return (value + this.zeroOffset) * (this.scaleFactor / toUnit.scaleFactor) - toUnit.zeroOffset;
    }
    /** @inheritdoc */
    convertFrom(value, fromUnit) {
        if (!this.canConvert(fromUnit)) {
            throw new Error(`Invalid conversion from ${fromUnit.name} to ${this.name}.`);
        }
        return (value + fromUnit.zeroOffset) * (fromUnit.scaleFactor / this.scaleFactor) - this.zeroOffset;
    }
}
/**
 * A unit of measure composed of the multiplicative combination of multiple elementary units.
 */
class CompoundUnit extends AbstractUnit {
    /**
     * Constructor.
     * @param family The family to which this unit belongs.
     * @param numerator An array of CompoundableUnits containing all the units in the numerator of the compound unit.
     * @param denominator An array of CompoundableUnits containing all the units in the denominator of the compound unit.
     * @param name The name of this unit. If not defined, one will be automatically generated.
     */
    constructor(family, numerator, denominator, name) {
        // if not specified, build name from component units.
        if (name === undefined) {
            name = '';
            let i = 0;
            while (i < numerator.length - 1) {
                name += `${numerator[i].name}-`;
            }
            name += `${numerator[i].name}`;
            if (denominator.length > 0) {
                name += ' per ';
                i = 0;
                while (i < denominator.length - 1) {
                    name += `${denominator[i].name}-`;
                }
                name += `${denominator[i].name}`;
            }
        }
        super(name);
        this.family = family;
        this.numerator = Array.from(numerator);
        this.denominator = Array.from(denominator);
        this.numerator.sort((a, b) => a.family.localeCompare(b.family));
        this.denominator.sort((a, b) => a.family.localeCompare(b.family));
        this.scaleFactor = this.getScaleFactor();
    }
    /**
     * Gets the scale factor for this unit.
     * @returns the scale factor for this unit.
     */
    getScaleFactor() {
        let factor = 1;
        factor = this.numerator.reduce((prev, curr) => prev * curr.scaleFactor, factor);
        factor = this.denominator.reduce((prev, curr) => prev / curr.scaleFactor, factor);
        return factor;
    }
    /** @inheritdoc */
    canConvert(otherUnit) {
        return otherUnit instanceof CompoundUnit && super.canConvert(otherUnit);
    }
    /** @inheritdoc */
    convertTo(value, toUnit) {
        if (!this.canConvert(toUnit)) {
            throw new Error(`Invalid conversion from ${this.name} to ${toUnit.name}.`);
        }
        return value * (this.scaleFactor / toUnit.scaleFactor);
    }
    /** @inheritdoc */
    convertFrom(value, fromUnit) {
        if (!this.canConvert(fromUnit)) {
            throw new Error(`Invalid conversion from ${fromUnit.name} to ${this.name}.`);
        }
        return value * (fromUnit.scaleFactor / this.scaleFactor);
    }
}
/**
 * Predefined unit families.
 */
var UnitFamily;
(function (UnitFamily) {
    UnitFamily["Distance"] = "distance";
    UnitFamily["Angle"] = "angle";
    UnitFamily["Duration"] = "duration";
    UnitFamily["Weight"] = "weight";
    UnitFamily["Volume"] = "volume";
    UnitFamily["Pressure"] = "pressure";
    UnitFamily["Temperature"] = "temperature";
    UnitFamily["Speed"] = "speed";
    UnitFamily["WeightFlux"] = "weight_flux";
    UnitFamily["VolumeFlux"] = "volume_flux";
})(UnitFamily || (UnitFamily = {}));
/**
 * Predefined unit types.
 */
class UnitType {
}
UnitType.METER = new SimpleUnit(UnitFamily.Distance, 'meter', 1);
UnitType.FOOT = new SimpleUnit(UnitFamily.Distance, 'foot', 0.3048);
UnitType.KILOMETER = new SimpleUnit(UnitFamily.Distance, 'kilometer', 1000);
UnitType.MILE = new SimpleUnit(UnitFamily.Distance, 'mile', 1609.34);
UnitType.NMILE = new SimpleUnit(UnitFamily.Distance, 'nautical mile', 1852);
UnitType.GA_RADIAN = new SimpleUnit(UnitFamily.Distance, 'great arc radian', 6378100);
UnitType.RADIAN = new SimpleUnit(UnitFamily.Angle, 'radian', 1);
UnitType.DEGREE = new SimpleUnit(UnitFamily.Angle, 'degree', Math.PI / 180);
UnitType.ARC_MIN = new SimpleUnit(UnitFamily.Angle, 'minute', Math.PI / 180 / 60);
UnitType.ARC_SEC = new SimpleUnit(UnitFamily.Angle, 'second', Math.PI / 180 / 3600);
UnitType.MILLISECOND = new SimpleUnit(UnitFamily.Duration, 'millisecond', 0.001);
UnitType.SECOND = new SimpleUnit(UnitFamily.Duration, 'second', 1);
UnitType.MINUTE = new SimpleUnit(UnitFamily.Duration, 'minute', 60);
UnitType.HOUR = new SimpleUnit(UnitFamily.Duration, 'hour', 3600);
UnitType.KILOGRAM = new SimpleUnit(UnitFamily.Weight, 'kilogram', 1);
UnitType.POUND = new SimpleUnit(UnitFamily.Weight, 'pound', 0.453592);
UnitType.TON = new SimpleUnit(UnitFamily.Weight, 'ton', 907.185);
UnitType.TONNE = new SimpleUnit(UnitFamily.Weight, 'tonne', 1000);
// the following fuel units use the generic conversion factor of 1 gal = 6.7 lbs
UnitType.LITER_FUEL = new SimpleUnit(UnitFamily.Weight, 'liter', 0.80283679);
UnitType.GALLON_FUEL = new SimpleUnit(UnitFamily.Weight, 'gallon', 3.0390664);
UnitType.LITER = new SimpleUnit(UnitFamily.Volume, 'liter', 1);
UnitType.GALLON = new SimpleUnit(UnitFamily.Volume, 'gallon', 3.78541);
UnitType.HPA = new SimpleUnit(UnitFamily.Pressure, 'hectopascal', 1);
UnitType.ATM = new SimpleUnit(UnitFamily.Pressure, 'atmosphere', 1013.25);
UnitType.IN_HG = new SimpleUnit(UnitFamily.Pressure, 'inch of mercury', 33.8639);
UnitType.MM_HG = new SimpleUnit(UnitFamily.Pressure, 'millimeter of mercury', 1.33322);
UnitType.CELSIUS = new SimpleUnit(UnitFamily.Temperature, '° Celsius', 1, 273.15);
UnitType.FAHRENHEIT = new SimpleUnit(UnitFamily.Temperature, '° Fahrenheit', 5 / 9, 459.67);
UnitType.KNOT = new CompoundUnit(UnitFamily.Speed, [UnitType.NMILE], [UnitType.HOUR], 'knot');
UnitType.KPH = new CompoundUnit(UnitFamily.Speed, [UnitType.KILOMETER], [UnitType.HOUR]);
UnitType.MPM = new CompoundUnit(UnitFamily.Speed, [UnitType.METER], [UnitType.MINUTE]);
UnitType.MPS = new CompoundUnit(UnitFamily.Speed, [UnitType.METER], [UnitType.SECOND]);
UnitType.FPM = new CompoundUnit(UnitFamily.Speed, [UnitType.FOOT], [UnitType.MINUTE]);
UnitType.FPS = new CompoundUnit(UnitFamily.Speed, [UnitType.FOOT], [UnitType.SECOND]);
UnitType.KGH = new CompoundUnit(UnitFamily.WeightFlux, [UnitType.KILOGRAM], [UnitType.HOUR]);
UnitType.PPH = new CompoundUnit(UnitFamily.WeightFlux, [UnitType.POUND], [UnitType.HOUR]);
UnitType.LPH_FUEL = new CompoundUnit(UnitFamily.WeightFlux, [UnitType.LITER_FUEL], [UnitType.HOUR]);
UnitType.GPH_FUEL = new CompoundUnit(UnitFamily.WeightFlux, [UnitType.GALLON_FUEL], [UnitType.HOUR]);

/**
 * A class for conversions of degree units.
 */
class Degrees {
    constructor() {
        /**
         * Converts degrees to radians.
         * @param degrees The degrees to convert.
         * @returns The result as radians.
         */
        this.toRadians = (degrees) => degrees * (Math.PI / 180);
    }
}
/**
 * A class for conversions of foot units.
 */
class Feet {
    constructor() {
        /**
         * Converts feet to meters.
         * @param feet The feet to convert.
         * @returns The result as meters.
         */
        this.toMeters = (feet) => feet * 0.3048;
        /**
         * Converts feet to nautical miles.
         * @param feet The feet to convert.
         * @returns The result as nautical miles.
         */
        this.toNauticalMiles = (feet) => feet / 6076.11549;
    }
}
/**
 * A class for conversions of meter units.
 */
class Meters {
    constructor() {
        /**
         * Converts meters to feet.
         * @param meters The meters to convert.
         * @returns The result as feet.
         */
        this.toFeet = (meters) => meters / 0.3048;
        /**
         * Converts meters to nautical miles.
         * @param meters The meters to convert.
         * @returns The result as nautical miles.
         */
        this.toNauticalMiles = (meters) => meters / 1852;
    }
}
/**
 * A class for conversions of nautical mile units.
 */
class NauticalMiles {
    constructor() {
        /**
         * Converts nautical miles to feet.
         * @param nm The nautical miles to convert.
         * @returns The result as feet.
         */
        this.toFeet = (nm) => nm * 6076.11549;
        /**
         * Converts nautical miles to meters.
         * @param nm The nautical miles to convert.
         * @returns The result as meters.
         */
        this.toMeters = (nm) => nm * 1852;
    }
}
/**
 * A class for conversions of radian units.
 */
class Radians {
    constructor() {
        /**
         * Converts radians to degrees.
         * @param radians The radians to convert.
         * @returns The result as degrees.
         */
        this.toDegrees = (radians) => radians * 180 / Math.PI;
    }
}
/**
 * A class for unit conversions.
 */
class Units {
}
/** The degrees unit. */
Units.Degrees = new Degrees();
/** The radians unit. */
Units.Radians = new Radians();
/** The feet unit. */
Units.Feet = new Feet();
/** The meters unit. */
Units.Meters = new Meters();
/** The nautical miles unit. */
Units.NauticalMiles = new NauticalMiles();

/**
 * 2D vector mathematical opertaions.
 */
/**
 * 3D vector mathematical opertaions.
 */
class Vec3Math {
    /**
     * Gets the spherical angle theta of a vector in radians.
     * @param vec - a vector.
     * @returns the spherical angle theta of the vector.
     */
    static theta(vec) {
        return Math.atan2(Math.hypot(vec[0], vec[1]), vec[2]);
    }
    /**
     * Gets the spherical angle phi of a vector in radians.
     * @param vec - a vector.
     * @returns the spherical angle phi of the vector.
     */
    static phi(vec) {
        return Math.atan2(vec[1], vec[0]);
    }
    /**
     * Sets the components of a vector.
     * @param x - the new x-component.
     * @param y - the new y-component.
     * @param z - the new z-component.
     * @param vec - the vector to change.
     * @returns the vector after it has been changed.
     */
    static set(x, y, z, vec) {
        vec[0] = x;
        vec[1] = y;
        vec[2] = z;
        return vec;
    }
    /**
     * Sets the spherical components of a vector.
     * @param r - the new length (magnitude).
     * @param theta - the new spherical angle theta, in radians.
     * @param phi - the new spherical angle phi, in radians.
     * @param vec - the vector to change.
     * @returns the vector after it has been changed.
     */
    static setFromSpherical(r, theta, phi, vec) {
        const sinTheta = Math.sin(theta);
        vec[0] = sinTheta * Math.cos(phi);
        vec[1] = sinTheta * Math.sin(phi);
        vec[2] = Math.cos(theta);
        return vec;
    }
    /**
     * Add one vector to another.
     * @param v1 The first vector.
     * @param v2 The second vector.
     * @param out The vector to write the results to.
     * @returns the vector sum.
     */
    static add(v1, v2, out) {
        out[0] = v1[0] + v2[0];
        out[1] = v1[1] + v2[1];
        out[2] = v1[2] + v2[2];
        return out;
    }
    /**
     * Subtracts one vector from another.
     * @param v1 The first vector.
     * @param v2 The second vector.
     * @param out The vector to write the results to.
     * @returns the vector difference.
     */
    static sub(v1, v2, out) {
        out[0] = v1[0] - v2[0];
        out[1] = v1[1] - v2[1];
        out[2] = v1[2] - v2[2];
        return out;
    }
    /**
     * Gets the dot product of two vectors.
     * @param v1 The first vector.
     * @param v2 The second vector.
     * @returns The dot product of the vectors.
     */
    static dot(v1, v2) {
        return v1[0] * v2[0] + v1[1] * v2[1] + v1[2] * v2[2];
    }
    /**
     * Gets the cross product of two vectors.
     * @param v1 - the first vector.
     * @param v2 - the second vector.
     * @param out - the vector to which to write the result.
     * @returns the cross product.
     */
    static cross(v1, v2, out) {
        const x1 = v1[0];
        const y1 = v1[1];
        const z1 = v1[2];
        const x2 = v2[0];
        const y2 = v2[1];
        const z2 = v2[2];
        out[0] = y1 * z2 - z1 * y2;
        out[1] = z1 * x2 - x1 * z2;
        out[2] = x1 * y2 - y1 * x2;
        return out;
    }
    /**
     * Multiplies a vector by a scalar.
     * @param v1 The vector to multiply.
     * @param scalar The scalar to apply.
     * @param out The vector to write the results to.
     * @returns The scaled vector.
     */
    static multScalar(v1, scalar, out) {
        out[0] = v1[0] * scalar;
        out[1] = v1[1] * scalar;
        out[2] = v1[2] * scalar;
        return out;
    }
    /**
     * Gets the magnitude of a vector.
     * @param v1 The vector to get the magnitude for.
     * @returns the vector's magnitude.
     */
    static abs(v1) {
        return Math.hypot(v1[0], v1[1], v1[2]);
    }
    /**
     * Normalizes the vector to a unit vector.
     * @param v1 The vector to normalize.
     * @param out The vector to write the results to.
     * @returns the normalized vector.
     */
    static normalize(v1, out) {
        const mag = Vec3Math.abs(v1);
        out[0] = v1[0] / mag;
        out[1] = v1[1] / mag;
        out[2] = v1[2] / mag;
        return out;
    }
    /**
     * Gets the Euclidean distance between two vectors.
     * @param vec1 The first vector.
     * @param vec2 The second vector.
     * @returns the Euclidean distance between the two vectors.
     */
    static distance(vec1, vec2) {
        return Math.hypot(vec2[0] - vec1[0], vec2[1] - vec1[0], vec2[2] - vec1[2]);
    }
    /**
     * Checks if two vectors are equal.
     * @param vec1 - the first vector.
     * @param vec2 - the second vector.
     * @returns whether the two vectors are equal.
     */
    static equals(vec1, vec2) {
        return vec1.length === vec2.length && vec1.every((element, index) => element === vec2[index]);
    }
    /**
     * Copies one vector to another.
     * @param from - the vector from which to copy.
     * @param to - the vector to which to copy.
     * @returns the changed vector.
     */
    static copy(from, to) {
        return Vec3Math.set(from[0], from[1], from[2], to);
    }
}

/**
 * A read-only wrapper for a GeoPoint.
 */
class GeoPointReadOnly {
    /**
     * Constructor.
     * @param source - the source of the new read-only point.
     */
    constructor(source) {
        this.source = source;
    }
    /**
     * The latitude of this point, in degrees.
     * @returns the latitude of this point.
     */
    get lat() {
        return this.source.lat;
    }
    /**
     * The longitude of this point, in degrees.
     * @returns the longitude of this point.
     */
    get lon() {
        return this.source.lon;
    }
    // eslint-disable-next-line jsdoc/require-jsdoc
    distance(arg1, arg2) {
        if (typeof arg1 === 'number') {
            return this.source.distance(arg1, arg2);
        }
        else {
            return this.source.distance(arg1);
        }
    }
    // eslint-disable-next-line jsdoc/require-jsdoc
    distanceRhumb(arg1, arg2) {
        if (typeof arg1 === 'number') {
            return this.source.distanceRhumb(arg1, arg2);
        }
        else {
            return this.source.distanceRhumb(arg1);
        }
    }
    // eslint-disable-next-line jsdoc/require-jsdoc
    bearingTo(arg1, arg2) {
        if (typeof arg1 === 'number') {
            return this.source.bearingTo(arg1, arg2);
        }
        else {
            return this.source.bearingTo(arg1);
        }
    }
    // eslint-disable-next-line jsdoc/require-jsdoc
    bearingFrom(arg1, arg2) {
        if (typeof arg1 === 'number') {
            return this.source.bearingFrom(arg1, arg2);
        }
        else {
            return this.source.bearingFrom(arg1);
        }
    }
    // eslint-disable-next-line jsdoc/require-jsdoc
    bearingRhumb(arg1, arg2) {
        if (typeof arg1 === 'number') {
            return this.source.bearingRhumb(arg1, arg2);
        }
        else {
            return this.source.bearingRhumb(arg1);
        }
    }
    /**
     * Offsets this point by an initial bearing and distance along a great circle.
     * @param bearing - the initial bearing (forward azimuth) by which to offset.
     * @param distance - the distance, in great-arc radians, by which to offset.
     * @param out - the GeoPoint to which to write the results. If not supplied, a new GeoPoint object is created.
     * @returns the offset point.
     * @throws {Error} argument out cannot be undefined.
     */
    offset(bearing, distance, out) {
        if (!out) {
            throw new Error('Cannot mutate a read-only GeoPoint.');
        }
        return this.source.offset(bearing, distance, out);
    }
    /**
     * Offsets this point by a constant bearing and distance along a rhumb line.
     * @param bearing - the bearing by which to offset.
     * @param distance - the distance, in great-arc radians, by which to offset.
     * @param out - the GeoPoint to which to write the results. If not supplied, a new GeoPoint object is created.
     * @returns the offset point.
     * @throws {Error} argument out cannot be undefined.
     */
    offsetRhumb(bearing, distance, out) {
        if (!out) {
            throw new Error('Cannot mutate a read-only GeoPoint.');
        }
        return this.source.offsetRhumb(bearing, distance, out);
    }
    /**
     * Calculates the cartesian (x, y, z) representation of this point, in units of great-arc radians. By convention,
     * in the cartesian coordinate system the origin is at the center of the Earth, the positive x-axis passes through
     * 0 degrees N, 0 degrees E, and the positive z-axis passes through the north pole.
     * @param out - the vector array to which to write the result.
     * @returns the cartesian representation of this point.
     */
    toCartesian(out) {
        return this.source.toCartesian(out);
    }
    // eslint-disable-next-line jsdoc/require-jsdoc
    equals(arg1, arg2, arg3) {
        if (typeof arg1 === 'number') {
            return this.source.equals(arg1, arg2, arg3);
        }
        else {
            return this.source.equals(arg1, arg2);
        }
    }
    /**
     * Copies this point.
     * @param to - an optional point to which to copy this point. If this argument is not supplied, a new GeoPoint object
     * will be created.
     * @returns a copy of this point.
     */
    copy(to) {
        return this.source.copy(to);
    }
}
/**
 * A point on Earth's surface. This class uses a spherical Earth model.
 */
class GeoPoint {
    /**
     * Constructor.
     * @param lat - the latitude, in degrees.
     * @param lon - the longitude, in degrees.
     */
    constructor(lat, lon) {
        this._lat = 0;
        this._lon = 0;
        this.set(lat, lon);
        this.readonly = new GeoPointReadOnly(this);
    }
    /**
     * The latitude of this point, in degrees.
     * @returns the latitude of this point.
     */
    get lat() {
        return this._lat;
    }
    /**
     * The longitude of this point, in degrees.
     * @returns the longitude of this point.
     */
    get lon() {
        return this._lon;
    }
    /**
     * Converts an argument list consisting of either a LatLonInterface or lat/lon coordinates into an equivalent
     * LatLonInterface.
     * @param arg1 Argument 1.
     * @param arg2 Argument 2.
     * @returns a LatLonInterface.
     */
    static asLatLonInterface(arg1, arg2) {
        if (typeof arg1 === 'number') {
            return GeoPoint.tempGeoPoint.set(arg1, arg2);
        }
        else {
            return arg1;
        }
    }
    /**
     * Converts an argument list consisting of either a 3D vector or x, y, z components into an equivalent 3D vector.
     * @param arg1 Argument 1.
     * @param arg2 Argument 2.
     * @param arg3 Argument 3.
     * @returns a 3D vector.
     */
    static asVec3(arg1, arg2, arg3) {
        if (typeof arg1 === 'number') {
            return Vec3Math.set(arg1, arg2, arg3, GeoPoint.tempVec3);
        }
        else {
            return arg1;
        }
    }
    // eslint-disable-next-line jsdoc/require-jsdoc
    set(arg1, arg2) {
        let lat, lon;
        if (typeof arg1 === 'number') {
            lat = arg1;
            lon = arg2;
        }
        else {
            lat = arg1.lat;
            lon = arg1.lon;
        }
        lat = GeoPoint.toPlusMinus180(lat);
        lon = GeoPoint.toPlusMinus180(lon);
        if (Math.abs(lat) > 90) {
            lat = 180 - lat;
            lat = GeoPoint.toPlusMinus180(lat);
            lon += 180;
            lon = GeoPoint.toPlusMinus180(lon);
        }
        this._lat = lat;
        this._lon = lon;
        return this;
    }
    // eslint-disable-next-line jsdoc/require-jsdoc
    setFromCartesian(arg1, arg2, arg3) {
        const vec = GeoPoint.asVec3(arg1, arg2, arg3);
        const theta = Vec3Math.theta(vec);
        const phi = Vec3Math.phi(vec);
        return this.set(90 - theta * Avionics.Utils.RAD2DEG, phi * Avionics.Utils.RAD2DEG);
    }
    // eslint-disable-next-line jsdoc/require-jsdoc
    distance(arg1, arg2) {
        const other = GeoPoint.asLatLonInterface(arg1, arg2);
        const lat1 = this.lat * Avionics.Utils.DEG2RAD;
        const lat2 = other.lat * Avionics.Utils.DEG2RAD;
        const lon1 = this.lon * Avionics.Utils.DEG2RAD;
        const lon2 = other.lon * Avionics.Utils.DEG2RAD;
        // haversine formula
        const sinHalfDeltaLat = Math.sin((lat2 - lat1) / 2);
        const sinHalfDeltaLon = Math.sin((lon2 - lon1) / 2);
        const a = sinHalfDeltaLat * sinHalfDeltaLat + Math.cos(lat1) * Math.cos(lat2) * sinHalfDeltaLon * sinHalfDeltaLon;
        return 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    }
    // eslint-disable-next-line jsdoc/require-jsdoc
    distanceRhumb(arg1, arg2) {
        const other = GeoPoint.asLatLonInterface(arg1, arg2);
        const lat1 = this.lat * Avionics.Utils.DEG2RAD;
        const lat2 = other.lat * Avionics.Utils.DEG2RAD;
        const lon1 = this.lon * Avionics.Utils.DEG2RAD;
        const lon2 = other.lon * Avionics.Utils.DEG2RAD;
        const deltaLat = lat2 - lat1;
        let deltaLon = lon2 - lon1;
        const deltaPsi = GeoPoint.deltaPsi(lat1, lat2);
        const correction = GeoPoint.rhumbCorrection(deltaPsi, lat1, lat2);
        if (Math.abs(deltaLon) > Math.PI) {
            deltaLon += -Math.sign(deltaLon) * 2 * Math.PI;
        }
        return Math.sqrt(deltaLat * deltaLat + correction * correction * deltaLon * deltaLon);
    }
    // eslint-disable-next-line jsdoc/require-jsdoc
    bearingTo(arg1, arg2) {
        const other = GeoPoint.asLatLonInterface(arg1, arg2);
        return GeoPoint.calculateInitialBearing(this, other);
    }
    // eslint-disable-next-line jsdoc/require-jsdoc
    bearingFrom(arg1, arg2) {
        const other = GeoPoint.asLatLonInterface(arg1, arg2);
        return (GeoPoint.calculateInitialBearing(this, other) + 180) % 360;
    }
    // eslint-disable-next-line jsdoc/require-jsdoc
    bearingRhumb(arg1, arg2) {
        const other = GeoPoint.asLatLonInterface(arg1, arg2);
        const lat1 = this.lat * Avionics.Utils.DEG2RAD;
        const lon1 = this.lon * Avionics.Utils.DEG2RAD;
        const lat2 = other.lat * Avionics.Utils.DEG2RAD;
        const lon2 = other.lon * Avionics.Utils.DEG2RAD;
        let deltaLon = lon2 - lon1;
        const deltaPsi = GeoPoint.deltaPsi(lat1, lat2);
        if (Math.abs(deltaLon) > Math.PI) {
            deltaLon += -Math.sign(deltaLon) * 2 * Math.PI;
        }
        return Math.atan2(deltaLon, deltaPsi) * Avionics.Utils.RAD2DEG;
    }
    /**
     * Offsets this point by an initial bearing and distance along a great circle.
     * @param bearing - the initial bearing (forward azimuth) by which to offset.
     * @param distance - the distance, in great-arc radians, by which to offset.
     * @param out - the GeoPoint to which to write the results. By default this point.
     * @returns the offset point.
     */
    offset(bearing, distance, out) {
        const latRad = this.lat * Avionics.Utils.DEG2RAD;
        const lonRad = this.lon * Avionics.Utils.DEG2RAD;
        const sinLat = Math.sin(latRad);
        const cosLat = Math.cos(latRad);
        const sinBearing = Math.sin(bearing * Avionics.Utils.DEG2RAD);
        const cosBearing = Math.cos(bearing * Avionics.Utils.DEG2RAD);
        const angularDistance = distance;
        const sinAngularDistance = Math.sin(angularDistance);
        const cosAngularDistance = Math.cos(angularDistance);
        const offsetLatRad = Math.asin(sinLat * cosAngularDistance + cosLat * sinAngularDistance * cosBearing);
        const offsetLonDeltaRad = Math.atan2(sinBearing * sinAngularDistance * cosLat, cosAngularDistance - sinLat * Math.sin(offsetLatRad));
        const offsetLat = offsetLatRad * Avionics.Utils.RAD2DEG;
        const offsetLon = (lonRad + offsetLonDeltaRad) * Avionics.Utils.RAD2DEG;
        return (out !== null && out !== void 0 ? out : this).set(offsetLat, offsetLon);
    }
    /**
     * Offsets this point by a constant bearing and distance along a rhumb line.
     * @param bearing - the bearing by which to offset.
     * @param distance - the distance, in great-arc radians, by which to offset.
     * @param out - the GeoPoint to which to write the results. By default this point.
     * @returns the offset point.
     */
    offsetRhumb(bearing, distance, out) {
        const latRad = this.lat * Avionics.Utils.DEG2RAD;
        const lonRad = this.lon * Avionics.Utils.DEG2RAD;
        const bearingRad = bearing * Avionics.Utils.DEG2RAD;
        const deltaLat = distance * Math.cos(bearingRad);
        let offsetLat = latRad + deltaLat;
        let offsetLon;
        if (Math.abs(offsetLat) >= Math.PI / 2) {
            // you can't technically go past the poles along a rhumb line, so we will simply terminate the path at the pole
            offsetLat = Math.sign(offsetLat) * 90;
            offsetLon = 0; // since longitude is meaningless at the poles, we'll arbitrarily pick a longitude of 0 degrees.
        }
        else {
            const deltaPsi = GeoPoint.deltaPsi(latRad, offsetLat);
            const correction = GeoPoint.rhumbCorrection(deltaPsi, latRad, offsetLat);
            const deltaLon = distance * Math.sin(bearingRad) / correction;
            offsetLon = lonRad + deltaLon;
            offsetLat *= Avionics.Utils.RAD2DEG;
            offsetLon *= Avionics.Utils.RAD2DEG;
        }
        return (out !== null && out !== void 0 ? out : this).set(offsetLat, offsetLon);
    }
    /**
     * Calculates the cartesian (x, y, z) representation of this point, in units of great-arc radians. By convention,
     * in the cartesian coordinate system the origin is at the center of the Earth, the positive x-axis passes through
     * 0 degrees N, 0 degrees E, and the positive z-axis passes through the north pole.
     * @param out - the vector array to which to write the result.
     * @returns the cartesian representation of this point.
     */
    toCartesian(out) {
        return GeoPoint.sphericalToCartesian(this, out);
    }
    // eslint-disable-next-line jsdoc/require-jsdoc
    equals(arg1, arg2, arg3) {
        const other = GeoPoint.asLatLonInterface(arg1, arg2);
        const tolerance = typeof arg1 === 'number' ? arg3 : arg2;
        if (other) {
            return this.distance(other) <= (tolerance !== null && tolerance !== void 0 ? tolerance : GeoPoint.EQUALITY_TOLERANCE);
        }
        else {
            return false;
        }
    }
    /**
     * Copies this point.
     * @param to - an optional point to which to copy this point. If this argument is not supplied, a new GeoPoint object
     * will be created.
     * @returns a copy of this point.
     */
    copy(to) {
        return to ? to.set(this.lat, this.lon) : new GeoPoint(this.lat, this.lon);
    }
    // eslint-disable-next-line jsdoc/require-jsdoc
    static sphericalToCartesian(arg1, arg2, arg3) {
        const point = GeoPoint.asLatLonInterface(arg1, arg2);
        const theta = (90 - point.lat) * Avionics.Utils.DEG2RAD;
        const phi = point.lon * Avionics.Utils.DEG2RAD;
        return Vec3Math.setFromSpherical(1, theta, phi, arg3 !== null && arg3 !== void 0 ? arg3 : arg2);
    }
    /**
     * Converts an angle, in degrees, to an equivalent value in the range [-180, 180).
     * @param angle - an angle in degrees.
     * @returns the angle's equivalent in the range [-180, 180).
     */
    static toPlusMinus180(angle) {
        return ((angle % 360) + 540) % 360 - 180;
    }
    /**
     * Calculates the initial bearing (forward azimuth) from an origin point to a destination point.
     * @param origin - the origin point.
     * @param destination - the destination point.
     * @returns the initial bearing from the origin to destination.
     */
    static calculateInitialBearing(origin, destination) {
        const lat1 = origin.lat * Avionics.Utils.DEG2RAD;
        const lat2 = destination.lat * Avionics.Utils.DEG2RAD;
        const lon1 = origin.lon * Avionics.Utils.DEG2RAD;
        const lon2 = destination.lon * Avionics.Utils.DEG2RAD;
        const cosLat2 = Math.cos(lat2);
        const x = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * cosLat2 * Math.cos(lon2 - lon1);
        const y = Math.sin(lon2 - lon1) * cosLat2;
        const bearing = Math.atan2(y, x) * Avionics.Utils.RAD2DEG;
        return (bearing + 360) % 360; // enforce range [0, 360)
    }
    /**
     * Calculates the difference in isometric latitude from a pair of geodetic (geocentric) latitudes.
     * @param latRad1 - geodetic latitude 1, in radians.
     * @param latRad2 - geodetic latitude 2, in radians.
     * @returns the difference in isometric latitude from latitude 1 to latitude 2, in radians.
     */
    static deltaPsi(latRad1, latRad2) {
        return Math.log(Math.tan(latRad2 / 2 + Math.PI / 4) / Math.tan(latRad1 / 2 + Math.PI / 4));
    }
    /**
     * Calculates the rhumb correction factor between two latitudes.
     * @param deltaPsi - the difference in isometric latitude beween the two latitudes.
     * @param latRad1 - geodetic latitude 1, in radians.
     * @param latRad2 - geodetic latitude 2, in radians.
     * @returns the rhumb correction factor between the two latitudes.
     */
    static rhumbCorrection(deltaPsi, latRad1, latRad2) {
        return Math.abs(deltaPsi) > 1e-12 ? ((latRad2 - latRad1) / deltaPsi) : Math.cos(latRad1);
    }
}
/**
 * The default equality tolerance, defined as the maximum allowed distance between two equal points in great-arc
 * radians.
 */
GeoPoint.EQUALITY_TOLERANCE = 1e-7; // ~61 cm
GeoPoint.tempVec3 = new Float64Array(3);
GeoPoint.tempGeoPoint = new GeoPoint(0, 0);

/**
 * A circle on Earth's surface, defined as the set of points on the Earth's surface equidistant (as measured
 * geodetically) from a central point.
 */
class GeoCircle {
    /**
     * Constructor.
     * @param center The center of the new small circle, represented as a position vector in the standard geographic
     * cartesian reference system.
     * @param radius The radius of the new small circle in great-arc radians.
     */
    constructor(center, radius) {
        this._center = new Float64Array(3);
        this._radius = 0;
        this.set(center, radius);
    }
    // eslint-disable-next-line jsdoc/require-returns
    /**
     * The center of this circle.
     */
    get center() {
        return this._center;
    }
    // eslint-disable-next-line jsdoc/require-returns
    /**
     * The radius of this circle, in great-arc radians.
     */
    get radius() {
        return this._radius;
    }
    /**
     * Checks whether this circle is a great circle, or equivalently, whether its radius is equal to pi / 2 great-arc
     * radians.
     * @returns Whether this circle is a great circle.
     */
    isGreatCircle() {
        return this._radius === Math.PI / 2;
    }
    /**
     * Calculates the length of an arc along this circle subtended by a central angle.
     * @param angle A central angle, in radians.
     * @returns the length of the arc subtended by the angle, in great-arc radians.
     */
    arcLength(angle) {
        return Math.sin(this._radius) * angle;
    }
    /**
     * Sets the center and radius of this circle.
     * @param center The new center.
     * @param radius The new radius in great-arc radians.
     * @returns this circle, after it has been changed.
     */
    set(center, radius) {
        if (center instanceof Float64Array) {
            if (Vec3Math.abs(center) === 0) {
                // if center has no direction, arbitrarily set the center to 0 N, 0 E.
                Vec3Math.set(1, 0, 0, this._center);
            }
            else {
                Vec3Math.normalize(center, this._center);
            }
        }
        else {
            GeoPoint.sphericalToCartesian(center, this._center);
        }
        this._radius = Math.abs(radius) % Math.PI;
        return this;
    }
    // eslint-disable-next-line jsdoc/require-jsdoc
    setAsGreatCircle(arg1, arg2) {
        this.set(GeoCircle._getGreatCircleNormal(arg1, arg2, GeoCircle.vec3Cache[0]), Math.PI / 2);
        return this;
    }
    /**
     * Gets the distance from a point to the center of this circle, in great-arc radians.
     * @param point The point to which to measure the distance.
     * @returns the distance from the point to the center of this circle.
     */
    distanceToCenter(point) {
        if (point instanceof Float64Array) {
            point = Vec3Math.normalize(point, GeoCircle.vec3Cache[0]);
        }
        else {
            point = GeoPoint.sphericalToCartesian(point, GeoCircle.vec3Cache[0]);
        }
        const dot = Vec3Math.dot(point, this._center);
        return Math.acos(Utils.Clamp(dot, -1, 1));
    }
    // eslint-disable-next-line jsdoc/require-jsdoc
    closest(point, out) {
        if (!(point instanceof Float64Array)) {
            point = GeoPoint.sphericalToCartesian(point, GeoCircle.vec3Cache[0]);
        }
        const offset = Vec3Math.multScalar(this._center, Math.cos(this._radius), GeoCircle.vec3Cache[1]);
        const dot = Vec3Math.dot(Vec3Math.sub(point, offset, GeoCircle.vec3Cache[2]), this._center);
        const planeProjected = Vec3Math.sub(point, Vec3Math.multScalar(this._center, dot, GeoCircle.vec3Cache[2]), GeoCircle.vec3Cache[2]);
        if (Vec3Math.dot(planeProjected, planeProjected) === 0 || Math.abs(Vec3Math.dot(planeProjected, this._center)) === 1) {
            // the point is equidistant from all points on this circle
            return out instanceof GeoPoint ? out.set(NaN, NaN) : Vec3Math.set(NaN, NaN, NaN, out);
        }
        const displacement = Vec3Math.multScalar(Vec3Math.normalize(Vec3Math.sub(planeProjected, offset, GeoCircle.vec3Cache[2]), GeoCircle.vec3Cache[2]), Math.sin(this._radius), GeoCircle.vec3Cache[2]);
        const closest = Vec3Math.add(offset, displacement, GeoCircle.vec3Cache[2]);
        return out instanceof Float64Array ? Vec3Math.normalize(closest, out) : out.setFromCartesian(closest);
    }
    /**
     * Calculates and returns the great-circle distance from a specified point to the closest point that lies on this
     * circle. In other words, calculates the shortest distance from a point to this circle. The distance is signed, with
     * positive distances representing deviation away from the center of the circle, and negative distances representing
     * deviation toward the center of the circle.
     * @param point A point, represented as either a position vector or lat/long coordinates.
     * @returns the great circle distance, in great-arc radians, from the point to the closest point on this circle.
     */
    distance(point) {
        const distanceToCenter = this.distanceToCenter(point);
        return distanceToCenter - this._radius;
    }
    /**
     * Checks whether a point lies on this circle.
     * @param point A point, represented as either a position vector or lat/long coordinates.
     * @param tolerance The error tolerance, in great-arc radians, of this operation. Defaults to
     * `GeoCircle.ANGULAR_TOLERANCE` if not specified.
     * @returns whether the point lies on this circle.
     */
    includes(point, tolerance = GeoCircle.ANGULAR_TOLERANCE) {
        const distance = this.distance(point);
        return Math.abs(distance) < tolerance;
    }
    /**
     * Checks whether a point lies within the boundary defined by this circle. This is equivalent to checking whether
     * the distance of the point from the center of this circle is less than or equal to this circle's radius.
     * @param point A point, represented as either a position vector or lat/long coordinates.
     * @param inclusive Whether points that lie on this circle should pass the check. True by default.
     * @param tolerance The error tolerance, in great-arc radians, of this operation. Defaults to
     * `GeoCircle.ANGULAR_TOLERANCE` if not specified.
     * @returns whether the point lies within the boundary defined by this circle.
     */
    encircles(point, inclusive = true, tolerance = GeoCircle.ANGULAR_TOLERANCE) {
        const distance = this.distance(point);
        return inclusive
            ? distance <= tolerance
            : distance < -tolerance;
    }
    /**
     * Gets the angular distance along an arc between two points that lie on this circle. The arc extends from the first
     * point to the second in a counterclockwise direction when viewed from above the center of the circle.
     * @param start A point on this circle which marks the beginning of an arc.
     * @param end A point on this circle which marks the end of an arc.
     * @param tolerance The error tolerance, in great-arc radians, when checking if `start` and `end` lie on this circle.
     * Defaults to `GeoCircle.ANGULAR_TOLERANCE` if not specified.
     * @returns the angular width of the arc between the two points, in radians.
     * @throws Error if either point does not lie on this circle.
     */
    angleAlong(start, end, tolerance = GeoCircle.ANGULAR_TOLERANCE) {
        if (!(start instanceof Float64Array)) {
            start = GeoPoint.sphericalToCartesian(start, GeoCircle.vec3Cache[1]);
        }
        if (!(end instanceof Float64Array)) {
            end = GeoPoint.sphericalToCartesian(end, GeoCircle.vec3Cache[2]);
        }
        if (!this.includes(start, tolerance) || !this.includes(end, tolerance)) {
            throw new Error(`GeoCircle: at least one of the two specified arc end points does not lie on this circle (start point distance of ${this.distance(start)}, end point distance of ${this.distance(end)}, vs tolerance of ${tolerance}).`);
        }
        if (this._radius <= GeoCircle.ANGULAR_TOLERANCE) {
            return 0;
        }
        const startRadialNormal = Vec3Math.normalize(Vec3Math.cross(this._center, start, GeoCircle.vec3Cache[3]), GeoCircle.vec3Cache[3]);
        const endRadialNormal = Vec3Math.normalize(Vec3Math.cross(this._center, end, GeoCircle.vec3Cache[4]), GeoCircle.vec3Cache[4]);
        const angularDistance = Math.acos(Utils.Clamp(Vec3Math.dot(startRadialNormal, endRadialNormal), -1, 1));
        const isArcGreaterThanSemi = Vec3Math.dot(startRadialNormal, end) < 0;
        return isArcGreaterThanSemi ? 2 * Math.PI - angularDistance : angularDistance;
    }
    /**
     * Gets the distance along an arc between two points that lie on this circle. The arc extends from the first point
     * to the second in a counterclockwise direction when viewed from above the center of the circle.
     * @param start A point on this circle which marks the beginning of an arc.
     * @param end A point on this circle which marks the end of an arc.
     * @param tolerance The error tolerance, in great-arc radians, when checking if `start` and `end` lie on this circle.
     * Defaults to `GeoCircle.ANGULAR_TOLERANCE` if not specified.
     * @returns the length of the arc between the two points, in great-arc radians.
     * @throws Error if either point does not lie on this circle.
     */
    distanceAlong(start, end, tolerance = GeoCircle.ANGULAR_TOLERANCE) {
        return this.arcLength(this.angleAlong(start, end, tolerance));
    }
    /**
     * Calculates the true bearing along this circle at a point on the circle.
     * @param point A point on this circle.
     * @param tolerance The error tolerance, in great-arc radians, when checking if `point` lies on this circle. Defaults
     * to `GeoCircle.ANGULAR_TOLERANCE` if not specified.
     * @returns the bearing along this circle at the point.
     * @throws Error if the point does not lie on this circle.
     */
    bearingAt(point, tolerance = GeoCircle.ANGULAR_TOLERANCE) {
        if (!(point instanceof Float64Array)) {
            point = GeoPoint.sphericalToCartesian(point, GeoCircle.vec3Cache[1]);
        }
        if (!this.includes(point, tolerance)) {
            throw new Error(`GeoCircle: the specified point does not lie on this circle (distance of ${Math.abs(this.distance(point))} vs tolerance of ${tolerance}).`);
        }
        if (this._radius <= GeoCircle.ANGULAR_TOLERANCE || 1 - Math.abs(Vec3Math.dot(point, GeoCircle.NORTH_POLE)) <= GeoCircle.ANGULAR_TOLERANCE) {
            // Meaningful bearings cannot be defined along a circle with 0 radius (effectively a point) and at the north and south poles.
            return NaN;
        }
        const radialNormal = Vec3Math.normalize(Vec3Math.cross(this._center, point, GeoCircle.vec3Cache[2]), GeoCircle.vec3Cache[2]);
        const northNormal = Vec3Math.normalize(Vec3Math.cross(point, GeoCircle.NORTH_POLE, GeoCircle.vec3Cache[3]), GeoCircle.vec3Cache[3]);
        return (Math.acos(Utils.Clamp(Vec3Math.dot(radialNormal, northNormal), -1, 1)) * (radialNormal[2] >= 0 ? 1 : -1) * Avionics.Utils.RAD2DEG - 90 + 360) % 360;
    }
    // eslint-disable-next-line jsdoc/require-jsdoc
    offsetDistanceAlong(point, distance, out, tolerance = GeoCircle.ANGULAR_TOLERANCE) {
        const angle = distance / Math.sin(this.radius);
        return this._offsetAngleAlong(point, angle, out, tolerance);
    }
    // eslint-disable-next-line jsdoc/require-jsdoc
    offsetAngleAlong(point, angle, out, tolerance = GeoCircle.ANGULAR_TOLERANCE) {
        return this._offsetAngleAlong(point, angle, out, tolerance);
    }
    /**
     * Offsets a point on this circle by a specified angular distance. The direction of the offset for positive distances
     * is counterclockwise when viewed from above the center of this circle.
     * @param point The point to offset.
     * @param angle The angular distance by which to offset, in radians.
     * @param out A Float64Array or GeoPoint object to which to write the result.
     * @param tolerance The error tolerance, in great-arc radians, when checking if `point` lies on this circle. Defaults
     * to `GeoCircle.ANGULAR_TOLERANCE` if not specified.
     * @returns The offset point.
     * @throws Error if the point does not lie on this circle.
     */
    _offsetAngleAlong(point, angle, out, tolerance = GeoCircle.ANGULAR_TOLERANCE) {
        if (!(point instanceof Float64Array)) {
            point = GeoPoint.sphericalToCartesian(point, GeoCircle.vec3Cache[3]);
        }
        if (!this.includes(point, tolerance)) {
            throw new Error(`GeoCircle: the specified point does not lie on this circle (distance of ${Math.abs(this.distance(point))} vs tolerance of ${tolerance}).`);
        }
        if (this.radius === 0) {
            return out instanceof GeoPoint ? out.setFromCartesian(point) : Vec3Math.copy(point, out);
        }
        // Since point may not lie exactly on this circle due to error tolerance, project point onto this circle to ensure
        // the offset point lies exactly on this circle.
        point = this.closest(point, GeoCircle.vec3Cache[3]);
        const sin = Math.sin(angle / 2);
        const q0 = Math.cos(angle / 2);
        const q1 = sin * this._center[0];
        const q2 = sin * this._center[1];
        const q3 = sin * this._center[2];
        const q0Sq = q0 * q0;
        const q1Sq = q1 * q1;
        const q2Sq = q2 * q2;
        const q3Sq = q3 * q3;
        const q01 = q0 * q1;
        const q02 = q0 * q2;
        const q03 = q0 * q3;
        const q12 = q1 * q2;
        const q13 = q1 * q3;
        const q23 = q2 * q3;
        const rot_11 = q0Sq + q1Sq - q2Sq - q3Sq;
        const rot_12 = 2 * (q12 - q03);
        const rot_13 = 2 * (q13 + q02);
        const rot_21 = 2 * (q12 + q03);
        const rot_22 = q0Sq - q1Sq + q2Sq - q3Sq;
        const rot_23 = 2 * (q23 - q01);
        const rot_31 = 2 * (q13 - q02);
        const rot_32 = 2 * (q23 + q01);
        const rot_33 = (q0Sq - q1Sq - q2Sq + q3Sq);
        const x = point[0];
        const y = point[1];
        const z = point[2];
        const rotX = rot_11 * x + rot_12 * y + rot_13 * z;
        const rotY = rot_21 * x + rot_22 * y + rot_23 * z;
        const rotZ = rot_31 * x + rot_32 * y + rot_33 * z;
        return out instanceof Float64Array
            ? Vec3Math.set(rotX, rotY, rotZ, out)
            : out.setFromCartesian(Vec3Math.set(rotX, rotY, rotZ, GeoCircle.vec3Cache[2]));
    }
    /**
     * Calculates and returns the set of intersection points between this circle and another one, and writes the results
     * to an array of position vectors.
     * @param other The other circle to test for intersections.
     * @param out An array in which to store the results. The results will be stored at indexes 0 and 1. If these indexes
     * are empty, then new Float64Array objects will be created and inserted into the array.
     * @returns The number of solutions written to the out array. Either 0, 1, or 2.
     */
    intersection(other, out) {
        const center1 = this._center;
        const center2 = other._center;
        const radius1 = this._radius;
        const radius2 = other._radius;
        /**
         * Theory: We can model geo circles as the intersection between a sphere and the unit sphere (Earth's surface).
         * Therefore, the intersection of two geo circles is the intersection between two spheres AND the unit sphere.
         * First, we find the intersection of the two non-Earth spheres (which can either be a sphere, a circle, or a
         * point), then we find the intersection of that geometry with the unit sphere.
         */
        const dot = Vec3Math.dot(center1, center2);
        const dotSquared = dot * dot;
        if (dotSquared === 1) {
            // the two circles are concentric; either there are zero solutions or infinite solutions; either way we don't
            // write any solutions to the array.
            return 0;
        }
        // find the position vector to the center of the circle which defines the intersection of the two geo circle
        // spheres.
        const a = (Math.cos(radius1) - dot * Math.cos(radius2)) / (1 - dotSquared);
        const b = (Math.cos(radius2) - dot * Math.cos(radius1)) / (1 - dotSquared);
        const intersection = Vec3Math.add(Vec3Math.multScalar(center1, a, GeoCircle.vec3Cache[0]), Vec3Math.multScalar(center2, b, GeoCircle.vec3Cache[1]), GeoCircle.vec3Cache[0]);
        const intersectionLengthSquared = Vec3Math.dot(intersection, intersection);
        if (intersectionLengthSquared > 1) {
            // the two geo circle spheres do not intersect.
            return 0;
        }
        const cross = Vec3Math.cross(center1, center2, GeoCircle.vec3Cache[1]);
        const crossLengthSquared = Vec3Math.dot(cross, cross);
        if (crossLengthSquared === 0) {
            // this technically can't happen (since we already check if center1 dot center2 === +/-1 above, but just in
            // case...)
            return 0;
        }
        const offset = Math.sqrt((1 - intersectionLengthSquared) / crossLengthSquared);
        let solutionCount = 1;
        if (!out[0]) {
            out[0] = new Float64Array(3);
        }
        out[0].set(cross);
        Vec3Math.multScalar(out[0], offset, out[0]);
        Vec3Math.add(out[0], intersection, out[0]);
        if (offset > 0) {
            if (!out[1]) {
                out[1] = new Float64Array(3);
            }
            out[1].set(cross);
            Vec3Math.multScalar(out[1], -offset, out[1]);
            Vec3Math.add(out[1], intersection, out[1]);
            solutionCount++;
        }
        return solutionCount;
    }
    /**
     * Calculates and returns the set of intersection points between this circle and another one, and writes the results
     * to an array of GeoPoint objects.
     * @param other The other circle to test for intersections.
     * @param out An array in which to store the results. The results will be stored at indexes 0 and 1. If these indexes
     * are empty, then new GeoPoint objects will be created and inserted into the array.
     * @returns The number of solutions written to the out array. Either 0, 1, or 2.
     */
    intersectionGeoPoint(other, out) {
        const solutionCount = this.intersection(other, GeoCircle.intersectionCache);
        for (let i = 0; i < solutionCount; i++) {
            if (!out[i]) {
                out[i] = new GeoPoint(0, 0);
            }
            out[i].setFromCartesian(GeoCircle.intersectionCache[i]);
        }
        return solutionCount;
    }
    /**
     * Calculates and returns the number of intersection points between this circle and another one. Returns NaN if there
     * are an infinite number of intersection points.
     * @param other The other circle to test for intersections.
     * @param tolerance The error tolerance, in great-arc radians, of this operation. Defaults to
     * `GeoCircle.ANGULAR_TOLERANCE` if not specified.
     * @returns the number of intersection points between this circle and the other one.
     */
    numIntersectionPoints(other, tolerance = GeoCircle.ANGULAR_TOLERANCE) {
        const center1 = this.center;
        const center2 = other.center;
        const radius1 = this.radius;
        const radius2 = other.radius;
        const dot = Vec3Math.dot(center1, center2);
        const dotSquared = dot * dot;
        if (dotSquared === 1) {
            // the two circles are concentric; if they are the same circle there are an infinite number of intersections,
            // otherwise there are none.
            if (dot === 1) {
                // centers are the same
                return (Math.abs(this.radius - other.radius) <= tolerance) ? NaN : 0;
            }
            else {
                // centers are antipodal
                return (Math.abs(Math.PI - this.radius - other.radius) <= tolerance) ? NaN : 0;
            }
        }
        const a = (Math.cos(radius1) - dot * Math.cos(radius2)) / (1 - dotSquared);
        const b = (Math.cos(radius2) - dot * Math.cos(radius1)) / (1 - dotSquared);
        const intersection = Vec3Math.add(Vec3Math.multScalar(center1, a, GeoCircle.vec3Cache[0]), Vec3Math.multScalar(center2, b, GeoCircle.vec3Cache[1]), GeoCircle.vec3Cache[1]);
        const intersectionLengthSquared = Vec3Math.dot(intersection, intersection);
        if (intersectionLengthSquared > 1) {
            return 0;
        }
        const cross = Vec3Math.cross(center1, center2, GeoCircle.vec3Cache[1]);
        const crossLengthSquared = Vec3Math.dot(cross, cross);
        if (crossLengthSquared === 0) {
            return 0;
        }
        const sinTol = Math.sin(tolerance);
        return ((1 - intersectionLengthSquared) / crossLengthSquared > sinTol * sinTol) ? 2 : 1;
    }
    /**
     * Creates a new small circle from a lat/long coordinate pair and radius.
     * @param point The center of the new small circle.
     * @param radius The radius of the new small circle, in great-arc radians.
     * @returns a small circle.
     */
    static createFromPoint(point, radius) {
        return new GeoCircle(GeoPoint.sphericalToCartesian(point, GeoCircle.vec3Cache[0]), radius);
    }
    // eslint-disable-next-line jsdoc/require-jsdoc
    static createGreatCircle(arg1, arg2) {
        return new GeoCircle(GeoCircle._getGreatCircleNormal(arg1, arg2, GeoCircle.vec3Cache[0]), Math.PI / 2);
    }
    /**
     * Creates a new great circle defined by one point and a bearing offset. The new great circle will be equivalent to
     * the path projected from the point with the specified initial bearing (forward azimuth).
     * @param point A point that lies on the new great circle.
     * @param bearing The initial bearing from the point.
     * @returns a great circle.
     */
    static createGreatCircleFromPointBearing(point, bearing) {
        return new GeoCircle(GeoCircle.getGreatCircleNormalFromPointBearing(point, bearing, GeoCircle.vec3Cache[0]), Math.PI / 2);
    }
    // eslint-disable-next-line jsdoc/require-jsdoc
    static getGreatCircleNormal(arg1, arg2, out) {
        return GeoCircle._getGreatCircleNormal(arg1, arg2, out);
    }
    /**
     * Calculates a normal vector for a great circle given two points which lie on the circle, or a point and initial bearing.
     * @param arg1 A point that lies on the great circle.
     * @param arg2 A second point that lies on the great circle, or an initial bearing from the first point.
     * @param out The vector to which to write the result.
     * @returns the normal vector for the great circle.
     */
    static _getGreatCircleNormal(arg1, arg2, out) {
        if (typeof arg2 === 'number') {
            return GeoCircle.getGreatCircleNormalFromPointBearing(arg1, arg2, out);
        }
        else {
            return GeoCircle.getGreatCircleNormalFromPoints(arg1, arg2, out);
        }
    }
    /**
     * Calculates a normal vector for a great circle given two points which lie on the cirlce.
     * @param point1 The first point that lies on the great circle.
     * @param point2 The second point that lies on the great circle.
     * @param out The vector to which to write the result.
     * @returns the normal vector for the great circle.
     */
    static getGreatCircleNormalFromPoints(point1, point2, out) {
        if (!(point1 instanceof Float64Array)) {
            point1 = GeoPoint.sphericalToCartesian(point1, GeoCircle.vec3Cache[0]);
        }
        if (!(point2 instanceof Float64Array)) {
            point2 = GeoPoint.sphericalToCartesian(point2, GeoCircle.vec3Cache[1]);
        }
        return Vec3Math.normalize(Vec3Math.cross(point1, point2, out), out);
    }
    /**
     * Calculates a normal vector for a great circle given a point and initial bearing.
     * @param point A point that lies on the great circle.
     * @param bearing The initial bearing from the point.
     * @param out The vector to which to write the result.
     * @returns the normal vector for the great circle.
     */
    static getGreatCircleNormalFromPointBearing(point, bearing, out) {
        if (point instanceof Float64Array) {
            point = GeoCircle.tempGeoPoint.setFromCartesian(point);
        }
        const lat = point.lat * Avionics.Utils.DEG2RAD;
        const long = point.lon * Avionics.Utils.DEG2RAD;
        bearing *= Avionics.Utils.DEG2RAD;
        const sinLat = Math.sin(lat);
        const sinLon = Math.sin(long);
        const cosLon = Math.cos(long);
        const sinBearing = Math.sin(bearing);
        const cosBearing = Math.cos(bearing);
        const x = sinLon * cosBearing - sinLat * cosLon * sinBearing;
        const y = -cosLon * cosBearing - sinLat * sinLon * sinBearing;
        const z = Math.cos(lat) * sinBearing;
        return Vec3Math.set(x, y, z, out);
    }
}
GeoCircle.ANGULAR_TOLERANCE = 1e-7; // ~61cm
GeoCircle.NORTH_POLE = new Float64Array([0, 0, 1]);
GeoCircle.tempGeoPoint = new GeoPoint(0, 0);
GeoCircle.vec3Cache = [new Float64Array(3), new Float64Array(3), new Float64Array(3), new Float64Array(3), new Float64Array(3)];
GeoCircle.intersectionCache = [new Float64Array(3), new Float64Array(3)];

/**
 * Navigational mathematics functions.
 */
class NavMath {
    /**
     * Clamps a value to a min and max.
     * @param val The value to clamp.
     * @param min The minimum value to clamp to.
     * @param max The maximum value to clamp to.
     * @returns The clamped value.
     */
    static clamp(val, min, max) {
        return Math.min(Math.max(val, min), max);
    }
    /**
     * Normalizes a heading to a 0-360 range.
     * @param heading The heading to normalize.
     * @returns The normalized heading.
     */
    static normalizeHeading(heading) {
        if (isFinite(heading)) {
            return (heading % 360 + 360) % 360;
        }
        else {
            console.error(`normalizeHeading: Invalid heading: ${heading}`);
            return NaN;
        }
    }
    /**
     * Gets the turn radius for a given true airspeed.
     * @param airspeedTrue The true airspeed of the plane.
     * @param bankAngle The bank angle of the plane, in degrees.
     * @returns The airplane turn radius.
     */
    static turnRadius(airspeedTrue, bankAngle) {
        return (Math.pow(airspeedTrue, 2) / (11.26 * Math.tan(bankAngle * NavMath.DEG2RAD)))
            / 3.2808399;
    }
    /**
     * Gets the required bank angle for a given true airspeed and turn radius.
     * @param airspeedTrue The true airspeed of the plane.
     * @param radius The airplane turn radius.
     * @returns The required bank angle, in degrees.
     */
    static bankAngle(airspeedTrue, radius) {
        const airspeedMS = airspeedTrue * 0.51444444;
        return Units.Radians.toDegrees(Math.atan(Math.pow(airspeedMS, 2) / (radius * 9.80665)));
    }
    /**
     * Get the turn direction for a given course change.
     * @param startCourse The start course.
     * @param endCourse The end course.
     * @returns The turn direction for the course change.
     */
    static getTurnDirection(startCourse, endCourse) {
        return NavMath.normalizeHeading(endCourse - startCourse) > 180 ? 'left' : 'right';
    }
    /**
     * Converts polar radians to degrees north.
     * @param radians The radians to convert.
     * @returns The angle, in degrees north.
     */
    static polarToDegreesNorth(radians) {
        return NavMath.normalizeHeading((180 / Math.PI) * (Math.PI / 2 - radians));
    }
    /**
     * Converts degrees north to polar radians.
     * @param degrees The degrees to convert.
     * @returns The angle radians, in polar.
     */
    static degreesNorthToPolar(degrees) {
        return NavMath.normalizeHeading(degrees - 90) / (180 / Math.PI);
    }
    /**
     * Calculates the distance along an arc on Earth's surface. The arc begins at the intersection of the great circle
     * passing through the center of a circle of radius `radius` meters in the direction of 'startBearing', and ends at
     * the intersection of the great circle passing through the center of the circle in the direction of 'endBearing',
     * proceeding clockwise (as viewed from above).
     * @param startBearing The degrees of the start of the arc.
     * @param endBearing The degrees of the end of the arc.
     * @param radius The radius of the arc, in meters.
     * @returns The arc distance.
     */
    static calculateArcDistance(startBearing, endBearing, radius) {
        const angularWidth = ((endBearing - startBearing + 360) % 360) * Avionics.Utils.DEG2RAD;
        const conversion = UnitType.GA_RADIAN.convertTo(1, UnitType.METER);
        return angularWidth * Math.sin(radius / conversion) * conversion;
    }
    /**
     * Calculates the intersection of a line and a circle.
     * @param x1 The start x of the line.
     * @param y1 The start y of the line.
     * @param x2 The end x of the line.
     * @param y2 The end y of the line.
     * @param cx The circle center x.
     * @param cy The circle center y.
     * @param r The radius of the circle.
     * @param sRef The reference to the solution object to write the solution to.
     * @returns The number of solutions (0, 1 or 2).
     */
    static circleIntersection(x1, y1, x2, y2, cx, cy, r, sRef) {
        const dx = x2 - x1;
        const dy = y2 - y1;
        const a = dx * dx + dy * dy;
        const b = 2 * (dx * (x1 - cx) + dy * (y1 - cy));
        const c = (x1 - cx) * (x1 - cx) + (y1 - cy) * (y1 - cy) - r * r;
        const det = b * b - 4 * a * c;
        if (a < 0.0000001 || det < 0) {
            sRef.x1 = NaN;
            sRef.x2 = NaN;
            sRef.y1 = NaN;
            sRef.y2 = NaN;
            return 0;
        }
        else if (det == 0) {
            const t = -b / (2 * a);
            sRef.x1 = x1 + t * dx;
            sRef.y1 = y1 + t * dy;
            sRef.x2 = NaN;
            sRef.y2 = NaN;
            return 1;
        }
        else {
            const t1 = ((-b + Math.sqrt(det)) / (2 * a));
            sRef.x1 = x1 + t1 * dx;
            sRef.y1 = y1 + t1 * dy;
            const t2 = ((-b - Math.sqrt(det)) / (2 * a));
            sRef.x2 = x1 + t2 * dx;
            sRef.y2 = y1 + t2 * dy;
            return 2;
        }
    }
    /**
     * Gets the degrees north that a point lies on a circle.
     * @param cx The x point of the center of the circle.
     * @param cy The y point of the center of the circle.
     * @param x The x point to get the bearing for.
     * @param y The y point to get the bearing for.
     * @returns The angle in degrees north that the point is relative to the center.
     */
    static northAngle(cx, cy, x, y) {
        return NavMath.polarToDegreesNorth(Math.atan2(y - cy, x - cx));
    }
    /**
     * Checks if a degrees north bearing is between two other degrees north bearings.
     * @param bearing The bearing in degrees north to check.
     * @param start The start bearing in degrees north.
     * @param end The end bearing, in degrees north.
     * @returns True if the bearing is between the two provided bearings, false otherwise.
     */
    static bearingIsBetween(bearing, start, end) {
        const range = this.normalizeHeading(end - start);
        const relativeBearing = this.normalizeHeading(bearing - start);
        return relativeBearing >= 0 && relativeBearing <= range;
    }
    /**
     * Converts a degrees north heading to a degrees north turn circle angle.
     * @param heading The heading to convert.
     * @param turnDirection The direction of the turn.
     * @returns A degrees north turn circle angle.
     */
    static headingToAngle(heading, turnDirection) {
        return NavMath.normalizeHeading(heading + (turnDirection === 'left' ? 90 : -90));
    }
    /**
     * Converts a degrees north turn circle angle to a degrees north heading.
     * @param angle The turn circle angle to convert.
     * @param turnDirection The direction of the turn.
     * @returns A degrees north heading.
     */
    static angleToHeading(angle, turnDirection) {
        return NavMath.normalizeHeading(angle + (turnDirection === 'left' ? -90 : 90));
    }
    /**
     * Calculates the wind correction angle.
     * @param course The current plane true course.
     * @param airspeedTrue The current plane true airspeed.
     * @param windDirection The direction of the wind, in degrees true.
     * @param windSpeed The current speed of the wind.
     * @returns The calculated wind correction angle.
     */
    static windCorrectionAngle(course, airspeedTrue, windDirection, windSpeed) {
        const currCrosswind = windSpeed * (Math.sin((course * Math.PI / 180) - (windDirection * Math.PI / 180)));
        const windCorrection = 180 * Math.asin(currCrosswind / airspeedTrue) / Math.PI;
        return windCorrection;
    }
    /**
     * Calculates the cross track deviation from the provided leg fixes.
     * @param start The location of the starting fix of the leg.
     * @param end The location of the ending fix of the leg.
     * @param pos The current plane location coordinates.
     * @returns The amount of cross track deviation, in nautical miles.
     */
    static crossTrack(start, end, pos) {
        const path = NavMath.geoCircleCache[0].setAsGreatCircle(start, end);
        if (isNaN(path.center[0])) {
            return NaN;
        }
        return UnitType.GA_RADIAN.convertTo(path.distance(pos), UnitType.NMILE);
    }
    /**
     * Calculates the along-track distance from a starting point to another point along a great-circle track running
     * through the starting point.
     * @param start The start of the great-circle track.
     * @param end The end of the great-circle track.
     * @param pos The point for which to calculate the along-track distance.
     * @returns The along-track distance, in nautical miles.
     */
    static alongTrack(start, end, pos) {
        const path = NavMath.geoCircleCache[0].setAsGreatCircle(start, end);
        if (isNaN(path.center[0])) {
            return NaN;
        }
        const distance = path.distanceAlong(start, path.closest(pos, NavMath.vec3Cache[0]));
        return UnitType.GA_RADIAN.convertTo((distance + Math.PI) % (2 * Math.PI) - Math.PI, UnitType.NMILE);
    }
    /**
     * Calculates the desired track from the provided leg fixes.
     * @param start The location of the starting fix of the leg.
     * @param end The location of the ending fix of the leg.
     * @param pos The current plane location coordinates.
     * @returns The desired track, in degrees true.
     */
    static desiredTrack(start, end, pos) {
        const path = NavMath.geoCircleCache[0].setAsGreatCircle(start, end);
        if (isNaN(path.center[0])) {
            return NaN;
        }
        return path.bearingAt(path.closest(pos, NavMath.vec3Cache[0]));
    }
    /**
     * Gets the desired track for a given arc.
     * @param center The center of the arc.
     * @param turnDirection The direction of the turn.
     * @param pos The current plane position.
     * @returns The desired track.
     */
    static desiredTrackArc(center, turnDirection, pos) {
        const northAngle = NavMath.geoPointCache[0].set(pos).bearingFrom(center);
        //TODO: Clamp the arc angle to the start and end angles
        return NavMath.angleToHeading(northAngle, turnDirection);
    }
    /**
     * Gets the percentage along the arc path that the plane currently is.
     * @param start The start of the arc, in degrees north.
     * @param end The end of the arc, in degrees north.
     * @param center The center location of the arc.
     * @param turnDirection The direction of the turn.
     * @param pos The current plane position.
     * @returns The percentage along the arc the plane is.
     */
    static percentAlongTrackArc(start, end, center, turnDirection, pos) {
        const bearingFromCenter = NavMath.geoPointCache[0].set(center).bearingTo(pos);
        const sign = turnDirection === 'right' ? 1 : -1;
        const alpha = ((end - start) * sign + 360) % 360;
        const mid = (start + alpha / 2 * sign + 360) % 360;
        const rotBearing = ((bearingFromCenter - mid) + 540) % 360 - 180;
        const frac = rotBearing * sign / alpha + 0.5;
        return frac;
    }
    /**
     * Gets a position given an arc and a distance from the arc start.
     * @param start The start bearing of the arc.
     * @param center The center of the arc.
     * @param radius The radius of the arc.
     * @param turnDirection The turn direction for the arc.
     * @param distance The distance along the arc to get the position for.
     * @param out The position to write to.
     * @returns The position along the arc that was written to.
     */
    static positionAlongArc(start, center, radius, turnDirection, distance, out) {
        const convertedRadius = UnitType.GA_RADIAN.convertTo(Math.sin(UnitType.METER.convertTo(radius, UnitType.GA_RADIAN)), UnitType.METER);
        const theta = UnitType.RADIAN.convertTo(distance / convertedRadius, UnitType.DEGREE);
        const bearing = turnDirection === 'right' ? start + theta : start - theta;
        center.offset(NavMath.normalizeHeading(bearing), UnitType.METER.convertTo(radius, UnitType.GA_RADIAN), out);
        return out;
    }
    /**
     * Gets the cross track distance for a given arc.
     * @param center The center of the arc.
     * @param radius The radius of the arc, in meters.
     * @param pos The current plane position.
     * @returns The cross track distance, in NM.
     */
    static crossTrackArc(center, radius, pos) {
        return UnitType.METER.convertTo(radius, UnitType.NMILE) - UnitType.GA_RADIAN.convertTo(NavMath.geoPointCache[0].set(pos).distance(center), UnitType.NMILE);
    }
    /**
     * Gets the total difference in degrees between two angles.
     * @param a The first angle.
     * @param b The second angle.
     * @returns The difference between the two angles, in degrees.
     */
    static diffAngle(a, b) {
        let diff = b - a;
        while (diff > 180) {
            diff -= 360;
        }
        while (diff <= -180) {
            diff += 360;
        }
        return diff;
    }
    /**
     * Finds side a given sides b, c, and angles beta, gamma.
     * @param b The length of side b, as a trigonometric ratio.
     * @param c The length of side c, as a trigonometric ratio.
     * @param beta The angle, in radians, of the opposite of side b.
     * @param gamma The angle, in radians, of the opposite of side c
     * @returns The length of side a, as a trigonometric ratio.
     */
    static napierSide(b, c, beta, gamma) {
        return 2 * Math.atan(Math.tan(0.5 * (b - c))
            * (Math.sin(0.5 * (beta + gamma)) / Math.sin(0.5 * (beta - gamma))));
    }
    /**
     * Calculates a normal vector to a provided course in degrees north.
     * @param course The course in degrees north.
     * @param turnDirection The direction of the turn to orient the normal.
     * @param outVector The normal vector for the provided course.
     */
    static normal(course, turnDirection, outVector) {
        const normalCourse = NavMath.headingToAngle(course, turnDirection);
        const polarCourse = NavMath.degreesNorthToPolar(normalCourse);
        outVector[0] = Math.cos(polarCourse);
        outVector[1] = Math.sin(polarCourse);
    }
}
NavMath.DEG2RAD = Math.PI / 180;
NavMath.RAD2DEG = 180 / Math.PI;
NavMath.vec3Cache = [new Float64Array(3)];
NavMath.geoPointCache = [new GeoPoint(0, 0), new GeoPoint(0, 0)];
NavMath.geoCircleCache = [new GeoCircle(new Float64Array(3), 0)];

/// <reference types="msfstypes/Coherent/Facilities" />
/**
 * A utility class for working with magnetic variation (magnetic declination).
 */
class MagVar {
    // eslint-disable-next-line jsdoc/require-jsdoc
    static get(arg1, arg2) {
        return MagVar.getMagVar(arg1, arg2);
    }
    // eslint-disable-next-line jsdoc/require-jsdoc
    static magneticToTrue(bearing, arg1, arg2) {
        return NavMath.normalizeHeading(bearing + (typeof arg1 === 'number' && arg2 === undefined ? arg1 : MagVar.getMagVar(arg1, arg2)));
    }
    // eslint-disable-next-line jsdoc/require-jsdoc
    static trueToMagnetic(bearing, arg1, arg2) {
        return NavMath.normalizeHeading(bearing - (typeof arg1 === 'number' && arg2 === undefined ? arg1 : MagVar.getMagVar(arg1, arg2)));
    }
    /**
     * Gets the magnetic variation (magnetic declination) at a specific point on Earth.
     * @param arg1 The query point, or the latitude of the query point.
     * @param arg2 The longitude of the query point.
     * @returns The magnetic variation (magnetic declination) at the point.
     */
    static getMagVar(arg1, arg2) {
        if (typeof Facilities === 'undefined') {
            // In case this code is executed before the Facilities class is created.
            return 0;
        }
        let lat, lon;
        if (typeof arg1 === 'number') {
            lat = arg1;
            lon = arg2;
        }
        else {
            lat = arg1.lat;
            lon = arg1.lon;
        }
        return Facilities.getMagVar(lat, lon);
    }
}

/**
 * The possible reference norths for navigation angle units.
 */
var NavAngleUnitReferenceNorth;
(function (NavAngleUnitReferenceNorth) {
    NavAngleUnitReferenceNorth["True"] = "true";
    NavAngleUnitReferenceNorth["Magnetic"] = "magnetic";
})(NavAngleUnitReferenceNorth || (NavAngleUnitReferenceNorth = {}));
/**
 * A navigation angle unit, which is a measure of angular degrees relative to either true or magnetic north.
 *
 * Unlike most other unit types, each instance of navigation angle unit contains state specific to that instance,
 * namely the location used to retrieve magnetic variation for conversions. Therefore, it is generally recommended
 * not to re-use the same NavAngleUnit instance to instantiate multiple NumberUnits.
 *
 * Conversions use the location of the NavAngleUnit instance whose conversion method is called; this also means that
 * when using `NumberUnit.asUnit()`, the location of the unit of the NumberUnit whose `asUnit()` method was called
 * will be used.
 */
class NavAngleUnit extends AbstractUnit {
    // eslint-disable-next-line jsdoc/require-jsdoc
    constructor(type, arg1, arg2) {
        super(type === NavAngleUnitReferenceNorth.True ? 'true bearing' : 'magnetic bearing');
        /** @inheritdoc */
        this.family = NavAngleUnit.FAMILY;
        /** This location used to retrieve magnetic variation for conversions related to this unit. */
        this.location = new GeoPoint(0, 0);
        typeof arg1 === 'number' ? this.location.set(arg1, arg2) : this.location.set(arg1);
    }
    /**
     * Checks whether this nav angle unit is relative to magnetic north.
     * @returns Whether this nav angle unit is relative to magnetic north.
     */
    isMagnetic() {
        return this.name === 'magnetic bearing';
    }
    /**
     * Converts a value of this unit to another unit. This unit's location is used for the conversion.
     * @param value The value to convert.
     * @param toUnit The unit to which to convert.
     * @returns The converted value.
     * @throws Error if attempting an invalid conversion.
     */
    convertTo(value, toUnit) {
        if (!this.canConvert(toUnit)) {
            throw new Error(`Invalid conversion from ${this.name} to ${toUnit.name}.`);
        }
        if (!isFinite(value)) {
            return NaN;
        }
        if (toUnit.name === this.name) {
            return value;
        }
        return this.isMagnetic() ? MagVar.magneticToTrue(value, this.location) : MagVar.trueToMagnetic(value, this.location);
    }
    /**
     * Converts a value of another unit to this unit. This unit's location is used for the conversion.
     * @param value The value to convert.
     * @param fromUnit The unit from which to convert.
     * @returns The converted value.
     * @throws Error if attempting an invalid conversion.
     */
    convertFrom(value, fromUnit) {
        if (!this.canConvert(fromUnit)) {
            throw new Error(`Invalid conversion from ${fromUnit.name} to ${this.name}.`);
        }
        if (!isFinite(value)) {
            return NaN;
        }
        if (fromUnit.name === this.name) {
            return value;
        }
        return this.isMagnetic() ? MagVar.trueToMagnetic(value, this.location) : MagVar.magneticToTrue(value, this.location);
    }
    /** @inheritdoc */
    equals(other) {
        return other instanceof NavAngleUnit && this.name === other.name && this.location.equals(other.location);
    }
    /**
     * Creates an instance of NavAngleUnit. The location of the unit is initialized to {0 N, 0 E}.
     * @param isMagnetic Whether the new unit is relative to magnetic north.
     * @returns An instance of NavAngleUnit.
     */
    static create(isMagnetic) {
        return new NavAngleUnit(isMagnetic ? NavAngleUnitReferenceNorth.Magnetic : NavAngleUnitReferenceNorth.True, 0, 0);
    }
}
NavAngleUnit.FAMILY = 'navangle';

/**
 * Bitflags describing the relative location of a point with respect to a rectangular bounding box.
 */
var Outcode;
(function (Outcode) {
    Outcode[Outcode["Inside"] = 0] = "Inside";
    Outcode[Outcode["Left"] = 1] = "Left";
    Outcode[Outcode["Top"] = 2] = "Top";
    Outcode[Outcode["Right"] = 4] = "Right";
    Outcode[Outcode["Bottom"] = 8] = "Bottom";
})(Outcode || (Outcode = {}));
Array.from({ length: 8 }, () => {
    return { point: new Float64Array(2), radial: 0 };
});

[new GeoPoint(0, 0), new GeoPoint(0, 0), new GeoPoint(0, 0), new GeoPoint(0, 0)];

var DmsDirection;
(function (DmsDirection) {
    DmsDirection["NORTH"] = "N";
    DmsDirection["SOUTH"] = "S";
    DmsDirection["WEST"] = "W";
    DmsDirection["EAST"] = "E";
})(DmsDirection || (DmsDirection = {}));

// eslint-disable-next-line @typescript-eslint/no-namespace
var Wait;
(function (Wait) {
    /**
     * Waits for a set amount of time.
     * @param delay The amount of time to wait in milliseconds.
     * @returns a Promise which is fulfilled after the delay.
     */
    // eslint-disable-next-line no-inner-declarations
    function awaitDelay(delay) {
        return new Promise(resolve => setTimeout(() => resolve(), delay));
    }
    Wait.awaitDelay = awaitDelay;
    /**
     * Waits for a condition to be satisfied.
     * @param predicate A function which evaluates whether the condition is satisfied.
     * @param interval The interval, in milliseconds, at which to evaluate the condition. A zero or negative value
     * causes the condition to be evaluated every frame. Defaults to 0.
     * @param timeout The amount of time, in milliseconds, before the returned Promise is rejected if the condition is
     * not satisfied. A zero or negative value causes the Promise to never be rejected and the condition to be
     * continually evaluated until it is satisfied. Defaults to 0.
     * @returns a Promise which is fulfilled when the condition is satisfied.
     */
    // eslint-disable-next-line no-inner-declarations
    function awaitCondition(predicate, interval = 0, timeout = 0) {
        const t0 = Date.now();
        if (interval <= 0) {
            const loopFunc = (resolve, reject) => {
                if (timeout > 0 && Date.now() - t0 >= timeout) {
                    reject('Await condition timed out.');
                }
                else {
                    predicate() ? resolve() : requestAnimationFrame(loopFunc.bind(undefined, resolve, reject));
                }
            };
            return new Promise((resolve, reject) => { loopFunc(resolve, reject); });
        }
        else {
            return new Promise((resolve, reject) => {
                const timer = setInterval(() => {
                    if (timeout > 0 && Date.now() - t0 > timeout) {
                        clearInterval(timer);
                        reject('Await condition timed out.');
                    }
                    else if (predicate()) {
                        clearInterval(timer);
                        resolve();
                    }
                }, interval);
            });
        }
    }
    Wait.awaitCondition = awaitCondition;
})(Wait || (Wait = {}));

/**
 * An event bus consumer for a specific topic.
 */
class Consumer {
    /**
     * Creates an instance of a Consumer.
     * @param bus The event bus to subscribe to.
     * @param topic The topic of the subscription.
     * @param state The state for the consumer to track.
     * @param currentHandler The current build filter handler stack, if any.
     */
    constructor(bus, topic, state = {}, currentHandler) {
        this.bus = bus;
        this.topic = topic;
        this.state = state;
        this.currentHandler = currentHandler;
    }
    /**
     * Handles an event using the provided event handler.
     * @param handler The event handler for the event.
     */
    handle(handler) {
        if (this.currentHandler !== undefined) {
            /**
             * The handler reference to store.
             * @param data The input data to the handler.
             */
            this.handlerReference = (data) => {
                if (this.currentHandler !== undefined) {
                    this.currentHandler(data, this.state, handler);
                }
            };
            this.bus.on(this.topic, this.handlerReference);
        }
        else {
            this.bus.on(this.topic, handler);
        }
    }
    /**
     * Disables handling of the event.
     * @param handler The handler to disable.
     */
    off(handler) {
        if (this.handlerReference !== undefined) {
            this.bus.off(this.topic, this.handlerReference);
        }
        else {
            this.bus.off(this.topic, handler);
        }
    }
    /**
     * Caps the event subscription to a specified frequency, in Hz.
     * @param frequency The frequency, in Hz, to cap to.
     * @returns A new consumer with the applied frequency filter.
     */
    atFrequency(frequency) {
        const deltaTimeTrigger = 1000 / frequency;
        return new Consumer(this.bus, this.topic, { previousTime: Date.now() }, (data, state, next) => {
            const currentTime = Date.now();
            const deltaTime = currentTime - state.previousTime;
            if (deltaTimeTrigger <= deltaTime) {
                while ((state.previousTime + deltaTimeTrigger) < currentTime) {
                    state.previousTime += deltaTimeTrigger;
                }
                this.with(data, next);
            }
        });
    }
    /**
     * Quantizes the numerical event data to consume only at the specified decimal precision.
     * @param precision The decimal precision to snap to.
     * @returns A new consumer with the applied precision filter.
     */
    withPrecision(precision) {
        return new Consumer(this.bus, this.topic, { lastValue: 0 }, (data, state, next) => {
            const dataValue = data;
            const multiplier = Math.pow(10, precision);
            const currentValueAtPrecision = Math.round(dataValue * multiplier) / multiplier;
            if (currentValueAtPrecision !== state.lastValue) {
                state.lastValue = currentValueAtPrecision;
                this.with(currentValueAtPrecision, next);
            }
        });
    }
    /**
     * Filter the subscription to consume only when the value has changed by a minimum amount.
     * @param amount The minimum amount threshold below which the consumer will not consume.
     * @returns A new consumer with the applied change threshold filter.
     */
    whenChangedBy(amount) {
        return new Consumer(this.bus, this.topic, { lastValue: 0 }, (data, state, next) => {
            const dataValue = data;
            const diff = Math.abs(dataValue - state.lastValue);
            if (diff >= amount) {
                state.lastValue = dataValue;
                this.with(data, next);
            }
        });
    }
    /**
     * Filter the subscription to consume only if the value has changed. At all.  Really only
     * useful for strings or other events that don't change much.
     * @returns A new consumer with the applied change threshold filter.
     */
    whenChanged() {
        return new Consumer(this.bus, this.topic, { lastValue: '' }, (data, state, next) => {
            if (state.lastValue !== data) {
                state.lastValue = data;
                this.with(data, next);
            }
        });
    }
    /**
     * Filters events by time such that events will not be consumed until a minimum duration
     * has passed since the previous event.
     * @param deltaTime The minimum delta time between events.
     * @returns A new consumer with the applied change threshold filter.
     */
    onlyAfter(deltaTime) {
        return new Consumer(this.bus, this.topic, { previousTime: Date.now() }, (data, state, next) => {
            const currentTime = Date.now();
            const timeDiff = currentTime - state.previousTime;
            if (timeDiff > deltaTime) {
                state.previousTime += deltaTime;
                this.with(data, next);
            }
        });
    }
    /**
     * Builds a handler stack from the current handler.
     * @param data The data to send in to the handler.
     * @param handler The handler to use for processing.
     */
    with(data, handler) {
        if (this.currentHandler !== undefined) {
            this.currentHandler(data, this.state, handler);
        }
        else {
            handler(data);
        }
    }
}

/**
 * A typed container for subscribers interacting with the Event Bus.
 */
class EventSubscriber {
    /**
     * Creates an instance of an EventSubscriber.
     * @param bus The EventBus that is the parent of this instance.
     */
    constructor(bus) {
        this.bus = bus;
    }
    /**
     * Subscribes to a topic on the bus.
     * @param topic The topic to subscribe to.
     * @returns A consumer to bind the event handler to.
     */
    on(topic) {
        return new Consumer(this.bus, topic);
    }
}

/// <reference types="msfstypes/JS/common" />
/**
 * An event bus that can be used to publish data from backend
 * components and devices to consumers.
 */
class EventBus {
    /**
     * Creates an instance of an EventBus.
     * @param useStorageSync Whether or not to use storage sync (optional, default false)
     */
    constructor(useStorageSync) {
        this._topicHandlersMap = new Map();
        this._wildcardHandlers = new Array();
        this._eventCache = new Map();
        this._busId = Math.floor(Math.random() * 2147483647);
        const syncFunc = useStorageSync ? EventBusStorageSync : EventBusCoherentSync;
        this._busSync = new syncFunc(this.pub.bind(this), this._busId);
        this.syncEvent('event_bus', 'resync_request', false);
        this.on('event_bus', (data) => {
            if (data == 'resync_request') {
                this.resyncEvents();
            }
        });
    }
    /**
     * Subscribes to a topic on the bus.
     * @param topic The topic to subscribe to.
     * @param handler The handler to be called when an event happens.
     */
    on(topic, handler) {
        var _a;
        const handlers = this._topicHandlersMap.get(topic);
        const isNew = !(handlers && handlers.push(handler));
        if (isNew) {
            this._topicHandlersMap.set(topic, [handler]);
        }
        const lastState = (_a = this._eventCache.get(topic)) === null || _a === void 0 ? void 0 : _a.data;
        if (this._eventCache.get(topic) !== undefined) {
            handler(lastState);
        }
    }
    /**
     * Unsubscribes a handler from the topic's events.
     * @param topic The topic to unsubscribe from.
     * @param handler The handler to unsubscribe from topic.
     */
    off(topic, handler) {
        const handlers = this._topicHandlersMap.get(topic);
        if (handlers) {
            handlers.splice(handlers.indexOf(handler) >>> 0, 1);
        }
    }
    /**
     * Subscribe to the handler as * to all topics.
     * @param handler The handler to subscribe to all events.
     */
    onAll(handler) {
        this._wildcardHandlers.push(handler);
    }
    /**
     * Unsubscribe the handler from all topics.
     * @param handler The handler to unsubscribe from all events.
     */
    offAll(handler) {
        const handlerIndex = this._wildcardHandlers.indexOf(handler);
        if (handlerIndex > -1) {
            this._wildcardHandlers.splice(handlerIndex >>> 0, 1);
        }
    }
    /**
     * Publishes an event to the topic on the bus.
     * @param topic The topic to publish to.
     * @param data The data portion of the event.
     * @param sync Whether or not this message needs to be synced on local stoage.
     * @param isCached Whether or not this message will be resync'd across the bus on load.
     */
    pub(topic, data, sync = false, isCached = true) {
        if (isCached) {
            this._eventCache.set(topic, { data: data, synced: sync });
        }
        const handlers = this._topicHandlersMap.get(topic);
        if (handlers !== undefined) {
            const len = handlers.length;
            for (let i = 0; i < len; i++) {
                try {
                    handlers[i](data);
                }
                catch (error) {
                    console.error(`Error in EventBus Handler: ${error}`);
                    if (error instanceof Error) {
                        console.error(error.stack);
                    }
                }
            }
        }
        // We don't know if anything is subscribed on busses in other instruments,
        // so we'll unconditionally sync if sync is true and trust that the
        // publisher knows what it's doing.
        if (sync) {
            this.syncEvent(topic, data, isCached);
        }
        // always push to wildcard handlers
        const wcLen = this._wildcardHandlers.length;
        for (let i = 0; i < wcLen; i++) {
            this._wildcardHandlers[i](topic, data);
        }
    }
    /**
     * Re-sync all synced events
     */
    resyncEvents() {
        for (const [topic, event] of this._eventCache) {
            if (event.synced) {
                this.syncEvent(topic, event.data, true);
            }
        }
    }
    /**
     * Publish an event to the sync bus.
     * @param topic The topic to publish to.
     * @param data The data to publish.
     * @param isCached Whether or not this message will be resync'd across the bus on load.
     */
    syncEvent(topic, data, isCached) {
        this._busSync.sendEvent(topic, data, isCached);
    }
    /**
     * Gets a typed publisher from the event bus..
     * @returns The typed publisher.
     */
    getPublisher() {
        return this;
    }
    /**
     * Gets a typed subscriber from the event bus.
     * @returns The typed subscriber.
     */
    getSubscriber() {
        return new EventSubscriber(this);
    }
}
/**
 * A class that manages event bus synchronization via data storage.
 */
class EventBusStorageSync {
    /**
     * Creates an instance of EventBusStorageSync.
     * @param recvEventCb A callback to execute when an event is received on the bus.
     * @param busId The ID of the bus.  Derp.
     */
    constructor(recvEventCb, busId) {
        this.recvEventCb = recvEventCb;
        this.busId = busId;
        window.addEventListener('storage', this.receiveEvent.bind(this));
    }
    /**
     * Sends an event via storage events.
     * @param topic The topic to send data on.
     * @param data The data to send.
     */
    sendEvent(topic, data) {
        // TODO can we do the stringing more gc friendly?
        // TODO we could not stringify on simple types, but the receiver wouldn't know I guess
        // TODO add handling for busIds to avoid message loops
        localStorage.setItem(EventBusStorageSync.EB_KEY, `${topic.toString()},${data !== undefined ? JSON.stringify(data) : EventBusStorageSync.EMPTY_DATA}`);
        // TODO move removeItem to a function called at intervals instead of every time?
        localStorage.removeItem(EventBusStorageSync.EB_KEY);
    }
    /**
     * Receives an event from storage and syncs onto the bus.
     * @param e The storage event that was received.
     */
    receiveEvent(e) {
        // TODO only react on topics that have subscribers
        if (e.key === EventBusStorageSync.EB_KEY && e.newValue) {
            const val = e.newValue.split(',');
            this.recvEventCb(val[0], val.length > 1 ? JSON.parse(val[1]) : undefined, true);
        }
    }
}
EventBusStorageSync.EMPTY_DATA = '{}';
EventBusStorageSync.EB_KEY = 'eb.evt';
/**
 * A class that manages event bus synchronization via Coherent notifications.
 */
class EventBusCoherentSync {
    /**
     * Creates an instance of EventBusCoherentSync.
     * @param recvEventCb A callback to execute when an event is received on the bus.
     * @param busId The ID of the bus.  Derp.
     */
    constructor(recvEventCb, busId) {
        this.evtNum = 0;
        this.lastEventSynced = -1;
        this.recvEventCb = recvEventCb;
        this.busId = busId;
        this.listener = RegisterViewListener(EventBusCoherentSync.EB_LISTENER_KEY);
        this.listener.on(EventBusCoherentSync.EB_KEY, this.receiveEvent.bind(this));
    }
    /**
     * Sends an event via Coherent events.
     * @param topic The topic to send data on.
     * @param data The data to send.
     * @param isCached Whether or not this event is cached.
     */
    sendEvent(topic, data, isCached) {
        this.listener.triggerToAllSubscribers(EventBusCoherentSync.EB_KEY, { topic, data, isCached, busId: this.busId, evtNum: this.evtNum++ });
    }
    /**
     * Receives an event via Coherent and syncs onto the bus.
     * @param e The storage event that was received.
     */
    receiveEvent(e) {
        // If we've sent this event, don't act on it.
        if (e.busId == this.busId) {
            return;
        }
        if (this.lastEventSynced !== e.evtNum) {
            // TODO only react on topics that have subscribers
            this.lastEventSynced = e.evtNum;
            this.recvEventCb(e['topic'], e['data'], undefined, e['isCached']);
        }
    }
}
EventBusCoherentSync.EMPTY_DATA = '{}';
EventBusCoherentSync.EB_KEY = 'eb.evt';
EventBusCoherentSync.EB_LISTENER_KEY = 'JS_LISTENER_SIMVARS';

/**
 * A basic event-bus publisher.
 */
class BasePublisher {
    /**
     * Creates an instance of BasePublisher.
     * @param bus The common event bus.
     * @param pacer An optional pacer to control the rate of publishing.
     */
    constructor(bus, pacer = undefined) {
        this.bus = bus;
        this.publisher = this.bus.getPublisher();
        this.publishActive = false;
        this.pacer = pacer;
    }
    /**
     * Start publishing.
     */
    startPublish() {
        this.publishActive = true;
    }
    /**
     * Stop publishing.
     */
    stopPublish() {
        this.publishActive = false;
    }
    /**
     * Tells whether or not the publisher is currently active.
     * @returns True if the publisher is active, false otherwise.
     */
    isPublishing() {
        return this.publishActive;
    }
    /**
     * A callback called when the publisher receives an update cycle.
     */
    onUpdate() {
        return;
    }
    /**
     * Publish a message if publishing is acpive
     * @param topic The topic key to publish to.
     * @param data The data type for chosen topic.
     * @param sync Whether or not the event should be synced via local storage.
     * @param isCached Whether or not the event should be cached.
     */
    publish(topic, data, sync = false, isCached = true) {
        if (this.publishActive && (!this.pacer || this.pacer.canPublish(topic, data))) {
            this.publisher.pub(topic, data, sync, isCached);
        }
    }
}
/**
 * A base class for publishers that need to handle simvars with built-in
 * support for pacing callbacks.
 */
class SimVarPublisher extends BasePublisher {
    /**
     * Create a SimVarPublisher
     * @param simVarMap A map of simvar event type keys to a SimVarDefinition.
     * @param bus The EventBus to use for publishing.
     * @param pacer An optional pacer to control the rate of publishing.
     */
    constructor(simVarMap, bus, pacer = undefined) {
        super(bus, pacer);
        this.simvars = simVarMap;
        this.subscribed = new Set();
    }
    /**
     * Subscribe to an event type to begin publishing.
     * @param data Key of the event type in the simVarMap
     */
    subscribe(data) {
        this.subscribed.add(data);
    }
    /**
     * Unsubscribe to an event to stop publishing.
     * @param data Key of the event type in the simVarMap
     */
    unsubscribe(data) {
        // TODO If we have multiple subscribers we may want to add reference counting here.
        this.subscribed.delete(data);
    }
    /**
     * Read the value of a given simvar by its key.
     * @param key The key of the simvar in simVarMap
     * @returns The value returned by SimVar.GetSimVarValue()
     */
    getValue(key) {
        const simvar = this.simvars.get(key);
        if (simvar === undefined) {
            return undefined;
        }
        return SimVar.GetSimVarValue(simvar.name, simvar.type);
    }
    /**
     * Publish all subscribed data points to the bus.
     */
    onUpdate() {
        for (const data of this.subscribed.values()) {
            const value = this.getValue(data);
            if (value !== undefined) {
                this.publish(data, value);
            }
        }
    }
    /**
     * Change the simvar read for a given key.
     * @param key The key of the simvar in simVarMap
     * @param value The new value to set the simvar to.
     */
    updateSimVarSource(key, value) {
        this.simvars.set(key, value);
    }
}

/**
 * A publisher for publishing H:Events on the bus.
 */
class HEventPublisher extends BasePublisher {
    /**
     * Dispatches an H:Event to the event bus.
     * @param hEvent The H:Event to dispatch.
     * @param sync Whether this event should be synced (optional, default false)
     */
    dispatchHEvent(hEvent, sync = false) {
        //console.log(`dispaching hevent:  ${hEvent}`);
        this.publish('hEvent', hEvent, sync, false);
    }
}

/**
 * Valid type arguments for Set/GetSimVarValue
 */
var SimVarValueType;
(function (SimVarValueType) {
    SimVarValueType["Number"] = "number";
    SimVarValueType["Degree"] = "degrees";
    SimVarValueType["Knots"] = "knots";
    SimVarValueType["Feet"] = "feet";
    SimVarValueType["Meters"] = "meters";
    SimVarValueType["FPM"] = "feet per minute";
    SimVarValueType["Radians"] = "radians";
    SimVarValueType["InHG"] = "inches of mercury";
    SimVarValueType["MB"] = "Millibars";
    SimVarValueType["Bool"] = "Bool";
    SimVarValueType["Celsius"] = "celsius";
    SimVarValueType["MHz"] = "MHz";
    SimVarValueType["KHz"] = "KHz";
    SimVarValueType["NM"] = "nautical mile";
    SimVarValueType["String"] = "string";
    SimVarValueType["RPM"] = "Rpm";
    SimVarValueType["PPH"] = "Pounds per hour";
    SimVarValueType["GPH"] = "gph";
    SimVarValueType["Farenheit"] = "farenheit";
    SimVarValueType["PSI"] = "psi";
    SimVarValueType["GAL"] = "gallons";
    SimVarValueType["Hours"] = "Hours";
    SimVarValueType["Volts"] = "Volts";
    SimVarValueType["Amps"] = "Amperes";
    SimVarValueType["Seconds"] = "seconds";
    SimVarValueType["Enum"] = "Enum";
    SimVarValueType["LLA"] = "latlonalt";
    SimVarValueType["MetersPerSecond"] = "meters per second";
})(SimVarValueType || (SimVarValueType = {}));

/// <reference types="msfstypes/Pages/VCockpit/Instruments/Shared/utils/XMLLogic" />
/** The kind of data to return. */
var CompositeLogicXMLValueType;
(function (CompositeLogicXMLValueType) {
    CompositeLogicXMLValueType[CompositeLogicXMLValueType["Any"] = 0] = "Any";
    CompositeLogicXMLValueType[CompositeLogicXMLValueType["Number"] = 1] = "Number";
    CompositeLogicXMLValueType[CompositeLogicXMLValueType["String"] = 2] = "String";
})(CompositeLogicXMLValueType || (CompositeLogicXMLValueType = {}));

/// <reference types="msfstypes/JS/dataStorage" />
/* eslint-disable no-inner-declarations */
// eslint-disable-next-line @typescript-eslint/no-namespace
var DataStore;
(function (DataStore) {
    /**
     * Writes a keyed value to the data store.
     * @param key A key.
     * @param value The value to set.
     */
    function set(key, value) {
        SetStoredData(key, JSON.stringify(value));
    }
    DataStore.set = set;
    /**
     * Retrieves a keyed value from the data store.
     * @param key A key.
     * @returns the value stored under the key, or undefined if one could not be retrieved.
     */
    function get(key) {
        try {
            const string = GetStoredData(key);
            return JSON.parse(string);
        }
        catch (e) {
            return undefined;
        }
    }
    DataStore.get = get;
    /**
     * Removes a key from the data store.
     * @param key The key to remove.
     */
    function remove(key) {
        DeleteStoredData(key);
    }
    DataStore.remove = remove;
})(DataStore || (DataStore = {}));

/**
 * Types of airspaces.
 */
var AirspaceType;
(function (AirspaceType) {
    AirspaceType[AirspaceType["None"] = 0] = "None";
    AirspaceType[AirspaceType["Center"] = 1] = "Center";
    AirspaceType[AirspaceType["ClassA"] = 2] = "ClassA";
    AirspaceType[AirspaceType["ClassB"] = 3] = "ClassB";
    AirspaceType[AirspaceType["ClassC"] = 4] = "ClassC";
    AirspaceType[AirspaceType["ClassD"] = 5] = "ClassD";
    AirspaceType[AirspaceType["ClassE"] = 6] = "ClassE";
    AirspaceType[AirspaceType["ClassF"] = 7] = "ClassF";
    AirspaceType[AirspaceType["ClassG"] = 8] = "ClassG";
    AirspaceType[AirspaceType["Tower"] = 9] = "Tower";
    AirspaceType[AirspaceType["Clearance"] = 10] = "Clearance";
    AirspaceType[AirspaceType["Ground"] = 11] = "Ground";
    AirspaceType[AirspaceType["Departure"] = 12] = "Departure";
    AirspaceType[AirspaceType["Approach"] = 13] = "Approach";
    AirspaceType[AirspaceType["MOA"] = 14] = "MOA";
    AirspaceType[AirspaceType["Restricted"] = 15] = "Restricted";
    AirspaceType[AirspaceType["Prohibited"] = 16] = "Prohibited";
    AirspaceType[AirspaceType["Warning"] = 17] = "Warning";
    AirspaceType[AirspaceType["Alert"] = 18] = "Alert";
    AirspaceType[AirspaceType["Danger"] = 19] = "Danger";
    AirspaceType[AirspaceType["Nationalpark"] = 20] = "Nationalpark";
    AirspaceType[AirspaceType["ModeC"] = 21] = "ModeC";
    AirspaceType[AirspaceType["Radar"] = 22] = "Radar";
    AirspaceType[AirspaceType["Training"] = 23] = "Training";
    AirspaceType[AirspaceType["Max"] = 24] = "Max";
})(AirspaceType || (AirspaceType = {}));

/**
 * A viewlistener that gets autopilot mode information.
 */
var MSFSAPStates;
(function (MSFSAPStates) {
    MSFSAPStates[MSFSAPStates["LogicOn"] = 1] = "LogicOn";
    MSFSAPStates[MSFSAPStates["APOn"] = 2] = "APOn";
    MSFSAPStates[MSFSAPStates["FDOn"] = 4] = "FDOn";
    MSFSAPStates[MSFSAPStates["FLC"] = 8] = "FLC";
    MSFSAPStates[MSFSAPStates["Alt"] = 16] = "Alt";
    MSFSAPStates[MSFSAPStates["AltArm"] = 32] = "AltArm";
    MSFSAPStates[MSFSAPStates["GS"] = 64] = "GS";
    MSFSAPStates[MSFSAPStates["GSArm"] = 128] = "GSArm";
    MSFSAPStates[MSFSAPStates["Pitch"] = 256] = "Pitch";
    MSFSAPStates[MSFSAPStates["VS"] = 512] = "VS";
    MSFSAPStates[MSFSAPStates["Heading"] = 1024] = "Heading";
    MSFSAPStates[MSFSAPStates["Nav"] = 2048] = "Nav";
    MSFSAPStates[MSFSAPStates["NavArm"] = 4096] = "NavArm";
    MSFSAPStates[MSFSAPStates["WingLevel"] = 8192] = "WingLevel";
    MSFSAPStates[MSFSAPStates["Attitude"] = 16384] = "Attitude";
    MSFSAPStates[MSFSAPStates["ThrottleSpd"] = 32768] = "ThrottleSpd";
    MSFSAPStates[MSFSAPStates["ThrottleMach"] = 65536] = "ThrottleMach";
    MSFSAPStates[MSFSAPStates["ATArm"] = 131072] = "ATArm";
    MSFSAPStates[MSFSAPStates["YD"] = 262144] = "YD";
    MSFSAPStates[MSFSAPStates["EngineRPM"] = 524288] = "EngineRPM";
    MSFSAPStates[MSFSAPStates["TOGAPower"] = 1048576] = "TOGAPower";
    MSFSAPStates[MSFSAPStates["Autoland"] = 2097152] = "Autoland";
    MSFSAPStates[MSFSAPStates["TOGAPitch"] = 4194304] = "TOGAPitch";
    MSFSAPStates[MSFSAPStates["Bank"] = 8388608] = "Bank";
    MSFSAPStates[MSFSAPStates["FBW"] = 16777216] = "FBW";
    MSFSAPStates[MSFSAPStates["AvionicsManaged"] = 33554432] = "AvionicsManaged";
    MSFSAPStates[MSFSAPStates["None"] = -2147483648] = "None";
})(MSFSAPStates || (MSFSAPStates = {}));

/// <reference types="msfstypes/JS/Simplane" />
/**
 * The available facility frequency types.
 */
var FacilityFrequencyType;
(function (FacilityFrequencyType) {
    FacilityFrequencyType[FacilityFrequencyType["None"] = 0] = "None";
    FacilityFrequencyType[FacilityFrequencyType["ATIS"] = 1] = "ATIS";
    FacilityFrequencyType[FacilityFrequencyType["Multicom"] = 2] = "Multicom";
    FacilityFrequencyType[FacilityFrequencyType["Unicom"] = 3] = "Unicom";
    FacilityFrequencyType[FacilityFrequencyType["CTAF"] = 4] = "CTAF";
    FacilityFrequencyType[FacilityFrequencyType["Ground"] = 5] = "Ground";
    FacilityFrequencyType[FacilityFrequencyType["Tower"] = 6] = "Tower";
    FacilityFrequencyType[FacilityFrequencyType["Clearance"] = 7] = "Clearance";
    FacilityFrequencyType[FacilityFrequencyType["Approach"] = 8] = "Approach";
    FacilityFrequencyType[FacilityFrequencyType["Departure"] = 9] = "Departure";
    FacilityFrequencyType[FacilityFrequencyType["Center"] = 10] = "Center";
    FacilityFrequencyType[FacilityFrequencyType["FSS"] = 11] = "FSS";
    FacilityFrequencyType[FacilityFrequencyType["AWOS"] = 12] = "AWOS";
    FacilityFrequencyType[FacilityFrequencyType["ASOS"] = 13] = "ASOS";
    /** Clearance Pre-Taxi*/
    FacilityFrequencyType[FacilityFrequencyType["CPT"] = 14] = "CPT";
    /** Remote Clearance Delivery */
    FacilityFrequencyType[FacilityFrequencyType["GCO"] = 15] = "GCO";
})(FacilityFrequencyType || (FacilityFrequencyType = {}));
/** Additional Approach Types (additive to those defined in simplane). */
var AdditionalApproachType;
(function (AdditionalApproachType) {
    AdditionalApproachType[AdditionalApproachType["APPROACH_TYPE_VISUAL"] = 99] = "APPROACH_TYPE_VISUAL";
})(AdditionalApproachType || (AdditionalApproachType = {}));
/**
 * Flags indicating the approach fix type.
 */
var FixTypeFlags;
(function (FixTypeFlags) {
    FixTypeFlags[FixTypeFlags["None"] = 0] = "None";
    FixTypeFlags[FixTypeFlags["IAF"] = 1] = "IAF";
    FixTypeFlags[FixTypeFlags["IF"] = 2] = "IF";
    FixTypeFlags[FixTypeFlags["MAP"] = 4] = "MAP";
    FixTypeFlags[FixTypeFlags["FAF"] = 8] = "FAF";
    FixTypeFlags[FixTypeFlags["MAHP"] = 16] = "MAHP";
})(FixTypeFlags || (FixTypeFlags = {}));
/**
 * Flags indicating the rnav approach type.
 */
var RnavTypeFlags;
(function (RnavTypeFlags) {
    RnavTypeFlags[RnavTypeFlags["None"] = 0] = "None";
    RnavTypeFlags[RnavTypeFlags["LNAV"] = 1] = "LNAV";
    RnavTypeFlags[RnavTypeFlags["LNAVVNAV"] = 2] = "LNAVVNAV";
    RnavTypeFlags[RnavTypeFlags["LP"] = 4] = "LP";
    RnavTypeFlags[RnavTypeFlags["LPV"] = 8] = "LPV";
})(RnavTypeFlags || (RnavTypeFlags = {}));
/**
 * The class of airport facility.
 */
var AirportClass;
(function (AirportClass) {
    /** No other airport class could be identified. */
    AirportClass[AirportClass["None"] = 0] = "None";
    /** The airport has at least one hard surface runway. */
    AirportClass[AirportClass["HardSurface"] = 1] = "HardSurface";
    /** The airport has no hard surface runways. */
    AirportClass[AirportClass["SoftSurface"] = 2] = "SoftSurface";
    /** The airport has only water surface runways. */
    AirportClass[AirportClass["AllWater"] = 3] = "AllWater";
    /** The airport has no runways, but does contain helipads. */
    AirportClass[AirportClass["HeliportOnly"] = 4] = "HeliportOnly";
    /** The airport is a non-public use airport. */
    AirportClass[AirportClass["Private"] = 5] = "Private";
})(AirportClass || (AirportClass = {}));
/**
 * The class of an airport facility, expressed as a mask for nearest airport search session filtering.
 */
var AirportClassMask;
(function (AirportClassMask) {
    /** No other airport class could be identified. */
    AirportClassMask[AirportClassMask["None"] = 0] = "None";
    /** The airport has at least one hard surface runway. */
    AirportClassMask[AirportClassMask["HardSurface"] = 2] = "HardSurface";
    /** The airport has no hard surface runways. */
    AirportClassMask[AirportClassMask["SoftSurface"] = 4] = "SoftSurface";
    /** The airport has only water surface runways. */
    AirportClassMask[AirportClassMask["AllWater"] = 8] = "AllWater";
    /** The airport has no runways, but does contain helipads. */
    AirportClassMask[AirportClassMask["HeliportOnly"] = 16] = "HeliportOnly";
    /** The airport is a non-public use airport. */
    AirportClassMask[AirportClassMask["Private"] = 32] = "Private";
})(AirportClassMask || (AirportClassMask = {}));
var UserFacilityType;
(function (UserFacilityType) {
    UserFacilityType[UserFacilityType["RADIAL_RADIAL"] = 0] = "RADIAL_RADIAL";
    UserFacilityType[UserFacilityType["RADIAL_DISTANCE"] = 1] = "RADIAL_DISTANCE";
    UserFacilityType[UserFacilityType["LAT_LONG"] = 2] = "LAT_LONG";
})(UserFacilityType || (UserFacilityType = {}));
/**
 * ARINC 424 Leg Types
 */
var LegType;
(function (LegType) {
    /** An unknown leg type. */
    LegType[LegType["Unknown"] = 0] = "Unknown";
    /** An arc-to-fix leg. This indicates a DME arc leg to a specified fix.*/
    LegType[LegType["AF"] = 1] = "AF";
    /** A course-to-altitude leg. */
    LegType[LegType["CA"] = 2] = "CA";
    /**
     * A course-to-DME-distance leg. This leg is flown on a wind corrected course
     * to a specific DME distance from another fix.
     */
    LegType[LegType["CD"] = 3] = "CD";
    /** A course-to-fix leg.*/
    LegType[LegType["CF"] = 4] = "CF";
    /** A course-to-intercept leg. */
    LegType[LegType["CI"] = 5] = "CI";
    /** A course-to-radial intercept leg. */
    LegType[LegType["CR"] = 6] = "CR";
    /** A direct-to-fix leg, from an unspecified starting position. */
    LegType[LegType["DF"] = 7] = "DF";
    /**
     * A fix-to-altitude leg. A FA leg is flown on a track from a fix to a
     * specified altitude.
     */
    LegType[LegType["FA"] = 8] = "FA";
    /**
     * A fix-to-distance leg. This leg is flown on a track from a fix to a
     * specific distance from the fix.
     */
    LegType[LegType["FC"] = 9] = "FC";
    /**
     * A fix to DME distance leg. This leg is flown on a track from a fix to
     * a specific DME distance from another fix.
     */
    LegType[LegType["FD"] = 10] = "FD";
    /** A course-to-manual-termination leg. */
    LegType[LegType["FM"] = 11] = "FM";
    /** A hold-to-altitude leg. The hold is flown until a specified altitude is reached. */
    LegType[LegType["HA"] = 12] = "HA";
    /**
     * A hold-to-fix leg. This indicates one time around the hold circuit and
     * then an exit.
     */
    LegType[LegType["HF"] = 13] = "HF";
    /** A hold-to-manual-termination leg. */
    LegType[LegType["HM"] = 14] = "HM";
    /** Initial procedure fix. */
    LegType[LegType["IF"] = 15] = "IF";
    /** A procedure turn leg. */
    LegType[LegType["PI"] = 16] = "PI";
    /** A radius-to-fix leg, with endpoint fixes, a center fix, and a radius. */
    LegType[LegType["RF"] = 17] = "RF";
    /** A track-to-fix leg, from the previous fix to the terminator. */
    LegType[LegType["TF"] = 18] = "TF";
    /** A heading-to-altitude leg. */
    LegType[LegType["VA"] = 19] = "VA";
    /** A heading-to-DME-distance leg. */
    LegType[LegType["VD"] = 20] = "VD";
    /** A heading-to-intercept leg. */
    LegType[LegType["VI"] = 21] = "VI";
    /** A heading-to-manual-termination leg. */
    LegType[LegType["VM"] = 22] = "VM";
    /** A heading-to-radial intercept leg. */
    LegType[LegType["VR"] = 23] = "VR";
    /** A leg representing a discontinuity in the flight plan. */
    LegType[LegType["Discontinuity"] = 99] = "Discontinuity";
})(LegType || (LegType = {}));
/**
 * Types of altitude restrictions on procedure legs.
 */
var AltitudeRestrictionType;
(function (AltitudeRestrictionType) {
    AltitudeRestrictionType[AltitudeRestrictionType["Unused"] = 0] = "Unused";
    AltitudeRestrictionType[AltitudeRestrictionType["At"] = 1] = "At";
    AltitudeRestrictionType[AltitudeRestrictionType["AtOrAbove"] = 2] = "AtOrAbove";
    AltitudeRestrictionType[AltitudeRestrictionType["AtOrBelow"] = 3] = "AtOrBelow";
    AltitudeRestrictionType[AltitudeRestrictionType["Between"] = 4] = "Between";
})(AltitudeRestrictionType || (AltitudeRestrictionType = {}));
var LegTurnDirection;
(function (LegTurnDirection) {
    LegTurnDirection[LegTurnDirection["None"] = 0] = "None";
    LegTurnDirection[LegTurnDirection["Left"] = 1] = "Left";
    LegTurnDirection[LegTurnDirection["Right"] = 2] = "Right";
    LegTurnDirection[LegTurnDirection["Either"] = 3] = "Either";
})(LegTurnDirection || (LegTurnDirection = {}));
var AirwayType;
(function (AirwayType) {
    AirwayType[AirwayType["None"] = 0] = "None";
    AirwayType[AirwayType["Victor"] = 1] = "Victor";
    AirwayType[AirwayType["Jet"] = 2] = "Jet";
    AirwayType[AirwayType["Both"] = 3] = "Both";
})(AirwayType || (AirwayType = {}));
var NdbType;
(function (NdbType) {
    NdbType[NdbType["CompassPoint"] = 0] = "CompassPoint";
    NdbType[NdbType["MH"] = 1] = "MH";
    NdbType[NdbType["H"] = 2] = "H";
    NdbType[NdbType["HH"] = 3] = "HH";
})(NdbType || (NdbType = {}));
var VorType;
(function (VorType) {
    VorType[VorType["Unknown"] = 0] = "Unknown";
    VorType[VorType["VOR"] = 1] = "VOR";
    VorType[VorType["VORDME"] = 2] = "VORDME";
    VorType[VorType["DME"] = 3] = "DME";
    VorType[VorType["TACAN"] = 4] = "TACAN";
    VorType[VorType["VORTAC"] = 5] = "VORTAC";
    VorType[VorType["ILS"] = 6] = "ILS";
    VorType[VorType["VOT"] = 7] = "VOT";
})(VorType || (VorType = {}));
var RunwaySurfaceType;
(function (RunwaySurfaceType) {
    RunwaySurfaceType[RunwaySurfaceType["Concrete"] = 0] = "Concrete";
    RunwaySurfaceType[RunwaySurfaceType["Grass"] = 1] = "Grass";
    RunwaySurfaceType[RunwaySurfaceType["WaterFSX"] = 2] = "WaterFSX";
    RunwaySurfaceType[RunwaySurfaceType["GrassBumpy"] = 3] = "GrassBumpy";
    RunwaySurfaceType[RunwaySurfaceType["Asphalt"] = 4] = "Asphalt";
    RunwaySurfaceType[RunwaySurfaceType["ShortGrass"] = 5] = "ShortGrass";
    RunwaySurfaceType[RunwaySurfaceType["LongGrass"] = 6] = "LongGrass";
    RunwaySurfaceType[RunwaySurfaceType["HardTurf"] = 7] = "HardTurf";
    RunwaySurfaceType[RunwaySurfaceType["Snow"] = 8] = "Snow";
    RunwaySurfaceType[RunwaySurfaceType["Ice"] = 9] = "Ice";
    RunwaySurfaceType[RunwaySurfaceType["Urban"] = 10] = "Urban";
    RunwaySurfaceType[RunwaySurfaceType["Forest"] = 11] = "Forest";
    RunwaySurfaceType[RunwaySurfaceType["Dirt"] = 12] = "Dirt";
    RunwaySurfaceType[RunwaySurfaceType["Coral"] = 13] = "Coral";
    RunwaySurfaceType[RunwaySurfaceType["Gravel"] = 14] = "Gravel";
    RunwaySurfaceType[RunwaySurfaceType["OilTreated"] = 15] = "OilTreated";
    RunwaySurfaceType[RunwaySurfaceType["SteelMats"] = 16] = "SteelMats";
    RunwaySurfaceType[RunwaySurfaceType["Bituminous"] = 17] = "Bituminous";
    RunwaySurfaceType[RunwaySurfaceType["Brick"] = 18] = "Brick";
    RunwaySurfaceType[RunwaySurfaceType["Macadam"] = 19] = "Macadam";
    RunwaySurfaceType[RunwaySurfaceType["Planks"] = 20] = "Planks";
    RunwaySurfaceType[RunwaySurfaceType["Sand"] = 21] = "Sand";
    RunwaySurfaceType[RunwaySurfaceType["Shale"] = 22] = "Shale";
    RunwaySurfaceType[RunwaySurfaceType["Tarmac"] = 23] = "Tarmac";
    RunwaySurfaceType[RunwaySurfaceType["WrightFlyerTrack"] = 24] = "WrightFlyerTrack";
    //SURFACE_TYPE_LAST_FSX
    RunwaySurfaceType[RunwaySurfaceType["Ocean"] = 26] = "Ocean";
    RunwaySurfaceType[RunwaySurfaceType["Water"] = 27] = "Water";
    RunwaySurfaceType[RunwaySurfaceType["Pond"] = 28] = "Pond";
    RunwaySurfaceType[RunwaySurfaceType["Lake"] = 29] = "Lake";
    RunwaySurfaceType[RunwaySurfaceType["River"] = 30] = "River";
    RunwaySurfaceType[RunwaySurfaceType["WasteWater"] = 31] = "WasteWater";
    RunwaySurfaceType[RunwaySurfaceType["Paint"] = 32] = "Paint";
    // UNUSED
    // SURFACE_TYPE_ERASE_GRASS
})(RunwaySurfaceType || (RunwaySurfaceType = {}));
var RunwayLightingType;
(function (RunwayLightingType) {
    RunwayLightingType[RunwayLightingType["Unknown"] = 0] = "Unknown";
    RunwayLightingType[RunwayLightingType["None"] = 1] = "None";
    RunwayLightingType[RunwayLightingType["PartTime"] = 2] = "PartTime";
    RunwayLightingType[RunwayLightingType["FullTime"] = 3] = "FullTime";
    RunwayLightingType[RunwayLightingType["Frequency"] = 4] = "Frequency";
})(RunwayLightingType || (RunwayLightingType = {}));
var AirportPrivateType;
(function (AirportPrivateType) {
    AirportPrivateType[AirportPrivateType["Uknown"] = 0] = "Uknown";
    AirportPrivateType[AirportPrivateType["Public"] = 1] = "Public";
    AirportPrivateType[AirportPrivateType["Military"] = 2] = "Military";
    AirportPrivateType[AirportPrivateType["Private"] = 3] = "Private";
})(AirportPrivateType || (AirportPrivateType = {}));
var GpsBoolean;
(function (GpsBoolean) {
    GpsBoolean[GpsBoolean["Unknown"] = 0] = "Unknown";
    GpsBoolean[GpsBoolean["No"] = 1] = "No";
    GpsBoolean[GpsBoolean["Yes"] = 2] = "Yes";
})(GpsBoolean || (GpsBoolean = {}));
var VorClass;
(function (VorClass) {
    VorClass[VorClass["Unknown"] = 0] = "Unknown";
    VorClass[VorClass["Terminal"] = 1] = "Terminal";
    VorClass[VorClass["LowAlt"] = 2] = "LowAlt";
    VorClass[VorClass["HighAlt"] = 3] = "HighAlt";
    VorClass[VorClass["ILS"] = 4] = "ILS";
    VorClass[VorClass["VOT"] = 5] = "VOT";
})(VorClass || (VorClass = {}));
var FacilityType;
(function (FacilityType) {
    FacilityType["Airport"] = "LOAD_AIRPORT";
    FacilityType["Intersection"] = "LOAD_INTERSECTION";
    FacilityType["VOR"] = "LOAD_VOR";
    FacilityType["NDB"] = "LOAD_NDB";
    FacilityType["USR"] = "USR";
    FacilityType["RWY"] = "RWY";
    FacilityType["VIS"] = "VIS";
})(FacilityType || (FacilityType = {}));
var FacilitySearchType;
(function (FacilitySearchType) {
    FacilitySearchType[FacilitySearchType["None"] = 0] = "None";
    FacilitySearchType[FacilitySearchType["Airport"] = 1] = "Airport";
    FacilitySearchType[FacilitySearchType["Intersection"] = 2] = "Intersection";
    FacilitySearchType[FacilitySearchType["Vor"] = 3] = "Vor";
    FacilitySearchType[FacilitySearchType["Ndb"] = 4] = "Ndb";
    FacilitySearchType[FacilitySearchType["Boundary"] = 5] = "Boundary";
    FacilitySearchType[FacilitySearchType["User"] = 6] = "User";
})(FacilitySearchType || (FacilitySearchType = {}));
/**
 * A type of airspace boundary.
 */
var BoundaryType;
(function (BoundaryType) {
    BoundaryType[BoundaryType["None"] = 0] = "None";
    BoundaryType[BoundaryType["Center"] = 1] = "Center";
    BoundaryType[BoundaryType["ClassA"] = 2] = "ClassA";
    BoundaryType[BoundaryType["ClassB"] = 3] = "ClassB";
    BoundaryType[BoundaryType["ClassC"] = 4] = "ClassC";
    BoundaryType[BoundaryType["ClassD"] = 5] = "ClassD";
    BoundaryType[BoundaryType["ClassE"] = 6] = "ClassE";
    BoundaryType[BoundaryType["ClassF"] = 7] = "ClassF";
    BoundaryType[BoundaryType["ClassG"] = 8] = "ClassG";
    BoundaryType[BoundaryType["Tower"] = 9] = "Tower";
    BoundaryType[BoundaryType["Clearance"] = 10] = "Clearance";
    BoundaryType[BoundaryType["Ground"] = 11] = "Ground";
    BoundaryType[BoundaryType["Departure"] = 12] = "Departure";
    BoundaryType[BoundaryType["Approach"] = 13] = "Approach";
    BoundaryType[BoundaryType["MOA"] = 14] = "MOA";
    BoundaryType[BoundaryType["Restricted"] = 15] = "Restricted";
    BoundaryType[BoundaryType["Prohibited"] = 16] = "Prohibited";
    BoundaryType[BoundaryType["Warning"] = 17] = "Warning";
    BoundaryType[BoundaryType["Alert"] = 18] = "Alert";
    BoundaryType[BoundaryType["Danger"] = 19] = "Danger";
    BoundaryType[BoundaryType["NationalPark"] = 20] = "NationalPark";
    BoundaryType[BoundaryType["ModeC"] = 21] = "ModeC";
    BoundaryType[BoundaryType["Radar"] = 22] = "Radar";
    BoundaryType[BoundaryType["Training"] = 23] = "Training";
})(BoundaryType || (BoundaryType = {}));
/**
 * A type of airspace boundary altitude maxima.
 */
var BoundaryAltitudeType;
(function (BoundaryAltitudeType) {
    BoundaryAltitudeType[BoundaryAltitudeType["Unknown"] = 0] = "Unknown";
    BoundaryAltitudeType[BoundaryAltitudeType["MSL"] = 1] = "MSL";
    BoundaryAltitudeType[BoundaryAltitudeType["AGL"] = 2] = "AGL";
    BoundaryAltitudeType[BoundaryAltitudeType["Unlimited"] = 3] = "Unlimited";
})(BoundaryAltitudeType || (BoundaryAltitudeType = {}));
/**
 * A type of boundary geometry vector.
 */
var BoundaryVectorType;
(function (BoundaryVectorType) {
    BoundaryVectorType[BoundaryVectorType["None"] = 0] = "None";
    BoundaryVectorType[BoundaryVectorType["Start"] = 1] = "Start";
    BoundaryVectorType[BoundaryVectorType["Line"] = 2] = "Line";
    BoundaryVectorType[BoundaryVectorType["Origin"] = 3] = "Origin";
    BoundaryVectorType[BoundaryVectorType["ArcCW"] = 4] = "ArcCW";
    BoundaryVectorType[BoundaryVectorType["ArcCCW"] = 5] = "ArcCCW";
    BoundaryVectorType[BoundaryVectorType["Circle"] = 6] = "Circle";
})(BoundaryVectorType || (BoundaryVectorType = {}));
/**
 * Wind speed units used by METAR.
 */
var MetarWindSpeedUnits;
(function (MetarWindSpeedUnits) {
    MetarWindSpeedUnits[MetarWindSpeedUnits["Knot"] = 0] = "Knot";
    MetarWindSpeedUnits[MetarWindSpeedUnits["MeterPerSecond"] = 1] = "MeterPerSecond";
    MetarWindSpeedUnits[MetarWindSpeedUnits["KilometerPerHour"] = 2] = "KilometerPerHour";
})(MetarWindSpeedUnits || (MetarWindSpeedUnits = {}));
/** Visibility distance units used by METAR. */
var MetarVisibilityUnits;
(function (MetarVisibilityUnits) {
    MetarVisibilityUnits[MetarVisibilityUnits["Meter"] = 0] = "Meter";
    MetarVisibilityUnits[MetarVisibilityUnits["StatuteMile"] = 1] = "StatuteMile";
})(MetarVisibilityUnits || (MetarVisibilityUnits = {}));
/**
 * METAR cloud layer coverage/sky condition.
 */
var MetarCloudLayerCoverage;
(function (MetarCloudLayerCoverage) {
    MetarCloudLayerCoverage[MetarCloudLayerCoverage["SkyClear"] = 0] = "SkyClear";
    MetarCloudLayerCoverage[MetarCloudLayerCoverage["Clear"] = 1] = "Clear";
    MetarCloudLayerCoverage[MetarCloudLayerCoverage["NoSignificant"] = 2] = "NoSignificant";
    MetarCloudLayerCoverage[MetarCloudLayerCoverage["Few"] = 3] = "Few";
    MetarCloudLayerCoverage[MetarCloudLayerCoverage["Scattered"] = 4] = "Scattered";
    MetarCloudLayerCoverage[MetarCloudLayerCoverage["Broken"] = 5] = "Broken";
    MetarCloudLayerCoverage[MetarCloudLayerCoverage["Overcast"] = 6] = "Overcast";
})(MetarCloudLayerCoverage || (MetarCloudLayerCoverage = {}));
/**
 * METAR significant cloud types.
 */
var MetarCloudLayerType;
(function (MetarCloudLayerType) {
    MetarCloudLayerType[MetarCloudLayerType["Unspecified"] = -1] = "Unspecified";
    MetarCloudLayerType[MetarCloudLayerType["ToweringCumulus"] = 0] = "ToweringCumulus";
    MetarCloudLayerType[MetarCloudLayerType["Cumulonimbus"] = 1] = "Cumulonimbus";
    MetarCloudLayerType[MetarCloudLayerType["AltocumulusCastellanus"] = 2] = "AltocumulusCastellanus";
})(MetarCloudLayerType || (MetarCloudLayerType = {}));
/** METAR phenomenon types. */
var MetarPhenomenonType;
(function (MetarPhenomenonType) {
    MetarPhenomenonType[MetarPhenomenonType["None"] = 0] = "None";
    MetarPhenomenonType[MetarPhenomenonType["Mist"] = 1] = "Mist";
    MetarPhenomenonType[MetarPhenomenonType["Duststorm"] = 2] = "Duststorm";
    MetarPhenomenonType[MetarPhenomenonType["Dust"] = 3] = "Dust";
    MetarPhenomenonType[MetarPhenomenonType["Drizzle"] = 4] = "Drizzle";
    MetarPhenomenonType[MetarPhenomenonType["FunnelCloud"] = 5] = "FunnelCloud";
    MetarPhenomenonType[MetarPhenomenonType["Fog"] = 6] = "Fog";
    MetarPhenomenonType[MetarPhenomenonType["Smoke"] = 7] = "Smoke";
    MetarPhenomenonType[MetarPhenomenonType["Hail"] = 8] = "Hail";
    MetarPhenomenonType[MetarPhenomenonType["SmallHail"] = 9] = "SmallHail";
    MetarPhenomenonType[MetarPhenomenonType["Haze"] = 10] = "Haze";
    MetarPhenomenonType[MetarPhenomenonType["IceCrystals"] = 11] = "IceCrystals";
    MetarPhenomenonType[MetarPhenomenonType["IcePellets"] = 12] = "IcePellets";
    MetarPhenomenonType[MetarPhenomenonType["DustSandWhorls"] = 13] = "DustSandWhorls";
    MetarPhenomenonType[MetarPhenomenonType["Spray"] = 14] = "Spray";
    MetarPhenomenonType[MetarPhenomenonType["Rain"] = 15] = "Rain";
    MetarPhenomenonType[MetarPhenomenonType["Sand"] = 16] = "Sand";
    MetarPhenomenonType[MetarPhenomenonType["SnowGrains"] = 17] = "SnowGrains";
    MetarPhenomenonType[MetarPhenomenonType["Shower"] = 18] = "Shower";
    MetarPhenomenonType[MetarPhenomenonType["Snow"] = 19] = "Snow";
    MetarPhenomenonType[MetarPhenomenonType["Squalls"] = 20] = "Squalls";
    MetarPhenomenonType[MetarPhenomenonType["Sandstorm"] = 21] = "Sandstorm";
    MetarPhenomenonType[MetarPhenomenonType["UnknownPrecip"] = 22] = "UnknownPrecip";
    MetarPhenomenonType[MetarPhenomenonType["VolcanicAsh"] = 23] = "VolcanicAsh";
})(MetarPhenomenonType || (MetarPhenomenonType = {}));
/** METAR phenomenon intensities. */
var MetarPhenomenonIntensity;
(function (MetarPhenomenonIntensity) {
    MetarPhenomenonIntensity[MetarPhenomenonIntensity["Light"] = -1] = "Light";
    MetarPhenomenonIntensity[MetarPhenomenonIntensity["Normal"] = 0] = "Normal";
    MetarPhenomenonIntensity[MetarPhenomenonIntensity["Heavy"] = 1] = "Heavy";
})(MetarPhenomenonIntensity || (MetarPhenomenonIntensity = {}));

({
    [RunwayDesignator.RUNWAY_DESIGNATOR_NONE]: '',
    [RunwayDesignator.RUNWAY_DESIGNATOR_LEFT]: 'L',
    [RunwayDesignator.RUNWAY_DESIGNATOR_RIGHT]: 'R',
    [RunwayDesignator.RUNWAY_DESIGNATOR_CENTER]: 'C',
    [RunwayDesignator.RUNWAY_DESIGNATOR_WATER]: 'W',
    [RunwayDesignator.RUNWAY_DESIGNATOR_A]: 'A',
    [RunwayDesignator.RUNWAY_DESIGNATOR_B]: 'B',
});
new GeoPoint(0, 0);

/// <reference types="msfstypes/JS/common" />
/**
 * A type map of facility type to facility search type.
 */
({
    /** Airport facility type. */
    [FacilityType.Airport]: FacilitySearchType.Airport,
    /** Intersection facility type. */
    [FacilityType.Intersection]: FacilitySearchType.Intersection,
    /** NDB facility type. */
    [FacilityType.NDB]: FacilitySearchType.Ndb,
    /** VOR facility type. */
    [FacilityType.VOR]: FacilitySearchType.Vor,
    /** USR facility type. */
    [FacilityType.USR]: FacilitySearchType.User
});
[FacilityType.USR];
/**
 * WT Airway Status Enum
 */
var AirwayStatus;
(function (AirwayStatus) {
    /**
     * @readonly
     * @property {number} INCOMPLETE - indicates waypoints have not been loaded yet.
     */
    AirwayStatus[AirwayStatus["INCOMPLETE"] = 0] = "INCOMPLETE";
    /**
     * @readonly
     * @property {number} COMPLETE - indicates all waypoints have been successfully loaded.
     */
    AirwayStatus[AirwayStatus["COMPLETE"] = 1] = "COMPLETE";
    /**
     * @readonly
     * @property {number} PARTIAL - indicates some, but not all, waypoints have been successfully loaded.
     */
    AirwayStatus[AirwayStatus["PARTIAL"] = 2] = "PARTIAL";
})(AirwayStatus || (AirwayStatus = {}));

var FacilityRepositorySyncType;
(function (FacilityRepositorySyncType) {
    FacilityRepositorySyncType[FacilityRepositorySyncType["Add"] = 0] = "Add";
    FacilityRepositorySyncType[FacilityRepositorySyncType["Remove"] = 1] = "Remove";
    FacilityRepositorySyncType[FacilityRepositorySyncType["DumpRequest"] = 2] = "DumpRequest";
    FacilityRepositorySyncType[FacilityRepositorySyncType["DumpResponse"] = 3] = "DumpResponse";
})(FacilityRepositorySyncType || (FacilityRepositorySyncType = {}));

/**
 * A type map of search type to concrete facility loader query type.
 */
new Map([
    [FacilitySearchType.Airport, FacilityType.Airport],
    [FacilitySearchType.Intersection, FacilityType.Intersection],
    [FacilitySearchType.Vor, FacilityType.VOR],
    [FacilitySearchType.Ndb, FacilityType.NDB],
    [FacilitySearchType.User, FacilityType.USR]
]);

[new GeoCircle(new Float64Array(3), 0)];

var IcaoSearchFilter;
(function (IcaoSearchFilter) {
    IcaoSearchFilter[IcaoSearchFilter["ALL"] = 0] = "ALL";
    IcaoSearchFilter[IcaoSearchFilter["AIRPORT"] = 1] = "AIRPORT";
    IcaoSearchFilter[IcaoSearchFilter["VOR"] = 2] = "VOR";
    IcaoSearchFilter[IcaoSearchFilter["NDB"] = 3] = "NDB";
    IcaoSearchFilter[IcaoSearchFilter["INTERSECTION"] = 4] = "INTERSECTION";
    IcaoSearchFilter[IcaoSearchFilter["USR"] = 5] = "USR";
})(IcaoSearchFilter || (IcaoSearchFilter = {}));

/// <reference types="msfstypes/JS/simvar" />
/**
 * A publisher for basic ADC/AHRS information.
 */
class ADCPublisher extends SimVarPublisher {
    /**
     * Create an ADCPublisher
     * @param bus The EventBus to publish to
     * @param pacer An optional pacer to use to control the rate of publishing
     */
    constructor(bus, pacer = undefined) {
        super(ADCPublisher.simvars, bus, pacer);
    }
    /**
     * Updates the ADC publisher.
     */
    onUpdate() {
        super.onUpdate();
    }
}
ADCPublisher.simvars = new Map([
    ['ias', { name: 'AIRSPEED INDICATED', type: SimVarValueType.Knots }],
    ['tas', { name: 'AIRSPEED TRUE', type: SimVarValueType.Knots }],
    ['alt', { name: 'INDICATED ALTITUDE', type: SimVarValueType.Feet }],
    ['vs', { name: 'VERTICAL SPEED', type: SimVarValueType.FPM }],
    ['hdg_deg', { name: 'PLANE HEADING DEGREES MAGNETIC', type: SimVarValueType.Degree }],
    ['pitch_deg', { name: 'PLANE PITCH DEGREES', type: SimVarValueType.Degree }],
    ['roll_deg', { name: 'PLANE BANK DEGREES', type: SimVarValueType.Degree }],
    ['hdg_deg_true', { name: 'PLANE HEADING DEGREES TRUE', type: SimVarValueType.Degree }],
    ['kohlsman_setting_hg_1', { name: 'KOHLSMAN SETTING HG', type: SimVarValueType.InHG }],
    ['turn_coordinator_ball', { name: 'TURN COORDINATOR BALL', type: SimVarValueType.Number }],
    ['delta_heading_rate', { name: 'DELTA HEADING RATE', type: SimVarValueType.Degree }],
    ['ambient_temp_c', { name: 'AMBIENT TEMPERATURE', type: SimVarValueType.Celsius }],
    ['ambient_wind_velocity', { name: 'AMBIENT WIND VELOCITY', type: SimVarValueType.Knots }],
    ['ambient_wind_direction', { name: 'AMBIENT WIND DIRECTION', type: SimVarValueType.Degree }],
    ['kohlsman_setting_mb_1', { name: 'KOHLSMAN SETTING MB', type: SimVarValueType.MB }],
    ['baro_units_hpa_1', { name: 'L:XMLVAR_Baro_Selector_HPA_1', type: SimVarValueType.Bool }],
    ['on_ground', { name: 'SIM ON GROUND', type: SimVarValueType.Bool }],
    ['aoa', { name: 'INCIDENCE ALPHA', type: SimVarValueType.Degree }]
]);

// Common definitions relevant to all radio types.
/** The basic radio types. */
var RadioType;
(function (RadioType) {
    RadioType["Com"] = "COM";
    RadioType["Nav"] = "NAV";
    RadioType["Adf"] = "ADF";
})(RadioType || (RadioType = {}));
/** The two frequency "banks", active and standby. */
var FrequencyBank;
(function (FrequencyBank) {
    FrequencyBank[FrequencyBank["Active"] = 0] = "Active";
    FrequencyBank[FrequencyBank["Standby"] = 1] = "Standby";
})(FrequencyBank || (FrequencyBank = {}));
/** COM frequency spacing on COM radios. */
var ComSpacing;
(function (ComSpacing) {
    /** 25Khz spacing */
    ComSpacing[ComSpacing["Spacing25Khz"] = 0] = "Spacing25Khz";
    /** 8.33Khz spacing */
    ComSpacing[ComSpacing["Spacing833Khz"] = 1] = "Spacing833Khz";
})(ComSpacing || (ComSpacing = {}));

/// <reference types="msfstypes/JS/simvar" />
/** Publish simvars for ourselves */
class NavProcSimVarPublisher extends SimVarPublisher {
    /**
     * Create a NavProcSimVarPublisher
     * @param bus The EventBus to publish to
     * @param pacer An optional pacer to use to control the pace of publishing
     */
    constructor(bus, pacer = undefined) {
        super(NavProcSimVarPublisher.simvars, bus, pacer);
    }
}
NavProcSimVarPublisher.simvars = new Map([
    ['nav1_obs', { name: 'NAV OBS:1', type: SimVarValueType.Degree }],
    ['nav1_cdi', { name: 'NAV CDI:1', type: SimVarValueType.Number }],
    ['nav1_dme', { name: 'NAV DME:1', type: SimVarValueType.NM }],
    ['nav1_has_dme', { name: 'NAV HAS DME:1', type: SimVarValueType.Bool }],
    ['nav1_has_nav', { name: 'NAV HAS NAV:1', type: SimVarValueType.Bool }],
    ['nav1_radial', { name: 'NAV RADIAL:1', type: SimVarValueType.Radians }],
    ['nav1_signal', { name: 'NAV SIGNAL:1', type: SimVarValueType.Number }],
    ['nav1_ident', { name: 'NAV IDENT:1', type: SimVarValueType.String }],
    ['nav1_to_from', { name: 'NAV TOFROM:1', type: SimVarValueType.Enum }],
    ['nav1_localizer', { name: 'NAV HAS LOCALIZER:1', type: SimVarValueType.Bool }],
    ['nav1_localizer_crs', { name: 'NAV LOCALIZER:1', type: SimVarValueType.Number }],
    ['nav1_glideslope', { name: 'NAV HAS GLIDE SLOPE:1', type: SimVarValueType.Bool }],
    ['nav1_gs_error', { name: 'NAV GLIDE SLOPE ERROR:1', type: SimVarValueType.Degree }],
    ['nav1_raw_gs', { name: 'NAV RAW GLIDE SLOPE:1', type: SimVarValueType.Degree }],
    ['nav1_gs_lla', { name: 'NAV GS LATLONALT:1', type: SimVarValueType.LLA }],
    ['nav1_lla', { name: 'NAV VOR LATLONALT:1', type: SimVarValueType.LLA }],
    ['nav1_magvar', { name: 'NAV MAGVAR:1', type: SimVarValueType.Number }],
    ['nav2_obs', { name: 'NAV OBS:2', type: SimVarValueType.Degree }],
    ['nav2_cdi', { name: 'NAV CDI:2', type: SimVarValueType.Number }],
    ['nav2_dme', { name: 'NAV DME:2', type: SimVarValueType.NM }],
    ['nav2_has_dme', { name: 'NAV HAS DME:2', type: SimVarValueType.Bool }],
    ['nav2_has_nav', { name: 'NAV HAS NAV:2', type: SimVarValueType.Bool }],
    ['nav2_radial', { name: 'NAV RADIAL:2', type: SimVarValueType.Radians }],
    ['nav2_signal', { name: 'NAV SIGNAL:2', type: SimVarValueType.Number }],
    ['nav2_ident', { name: 'NAV IDENT:2', type: SimVarValueType.String }],
    ['nav2_to_from', { name: 'NAV TOFROM:2', type: SimVarValueType.Enum }],
    ['nav2_localizer', { name: 'NAV HAS LOCALIZER:2', type: SimVarValueType.Bool }],
    ['nav2_localizer_crs', { name: 'NAV LOCALIZER:2', type: SimVarValueType.Number }],
    ['nav2_glideslope', { name: 'NAV HAS GLIDE SLOPE:2', type: SimVarValueType.Bool }],
    ['nav2_gs_error', { name: 'NAV GLIDE SLOPE ERROR:2', type: SimVarValueType.Degree }],
    ['nav2_raw_gs', { name: 'NAV RAW GLIDE SLOPE:2', type: SimVarValueType.Degree }],
    ['nav2_gs_lla', { name: 'NAV GS LATLONALT:2', type: SimVarValueType.LLA }],
    ['nav2_lla', { name: 'NAV VOR LATLONALT:2', type: SimVarValueType.LLA }],
    ['nav2_magvar', { name: 'NAV MAGVAR:2', type: SimVarValueType.Number }],
    ['gps_dtk', { name: 'GPS WP DESIRED TRACK', type: SimVarValueType.Degree }],
    ['gps_xtk', { name: 'GPS WP CROSS TRK', type: SimVarValueType.NM }],
    ['gps_wp', { name: 'GPS WP NEXT ID', type: SimVarValueType.NM }],
    ['gps_wp_bearing', { name: 'GPS WP BEARING', type: SimVarValueType.Degree }],
    ['gps_wp_distance', { name: 'GPS WP DISTANCE', type: SimVarValueType.NM }],
    ['adf1_bearing', { name: 'ADF RADIAL:1', type: SimVarValueType.Radians }],
    ['adf1_signal', { name: 'ADF SIGNAL:1', type: SimVarValueType.Number }],
    ['mkr_bcn_state_simvar', { name: 'MARKER BEACON STATE', type: SimVarValueType.Number }],
    ['gps_obs_active_simvar', { name: 'GPS OBS ACTIVE', type: SimVarValueType.Bool }],
    ['gps_obs_value_simvar', { name: 'GPS OBS VALUE', type: SimVarValueType.Degree }]
]);
//
// Navigation event configurations
//
var NavSourceType;
(function (NavSourceType) {
    NavSourceType[NavSourceType["Nav"] = 0] = "Nav";
    NavSourceType[NavSourceType["Gps"] = 1] = "Gps";
    NavSourceType[NavSourceType["Adf"] = 2] = "Adf";
})(NavSourceType || (NavSourceType = {}));
//* ENUM for VOR To/From Flag */
var VorToFrom;
(function (VorToFrom) {
    VorToFrom[VorToFrom["OFF"] = 0] = "OFF";
    VorToFrom[VorToFrom["TO"] = 1] = "TO";
    VorToFrom[VorToFrom["FROM"] = 2] = "FROM";
})(VorToFrom || (VorToFrom = {}));
/** Marker beacon signal state. */
var MarkerBeaconState;
(function (MarkerBeaconState) {
    MarkerBeaconState[MarkerBeaconState["Inactive"] = 0] = "Inactive";
    MarkerBeaconState[MarkerBeaconState["Outer"] = 1] = "Outer";
    MarkerBeaconState[MarkerBeaconState["Middle"] = 2] = "Middle";
    MarkerBeaconState[MarkerBeaconState["Inner"] = 3] = "Inner";
})(MarkerBeaconState || (MarkerBeaconState = {}));

/** A publisher to poll and publish nav/com simvars. */
class NavComSimVarPublisher extends SimVarPublisher {
    /**
     * Create a NavComSimVarPublisher
     * @param bus The EventBus to publish to
     * @param pacer An optional pacer to use to control the pace of publishing
     */
    constructor(bus, pacer = undefined) {
        super(NavComSimVarPublisher.simvars, bus, pacer);
    }
}
NavComSimVarPublisher.simvars = new Map([
    ['nav1ActiveFreq', { name: 'NAV ACTIVE FREQUENCY:1', type: SimVarValueType.MHz }],
    ['nav1StandbyFreq', { name: 'NAV STANDBY FREQUENCY:1', type: SimVarValueType.MHz }],
    ['nav1Ident', { name: 'NAV IDENT:1', type: SimVarValueType.String }],
    ['nav2ActiveFreq', { name: 'NAV ACTIVE FREQUENCY:2', type: SimVarValueType.MHz }],
    ['nav2StandbyFreq', { name: 'NAV STANDBY FREQUENCY:2', type: SimVarValueType.MHz }],
    ['nav2Ident', { name: 'NAV IDENT:2', type: SimVarValueType.String }],
    ['com1ActiveFreq', { name: 'COM ACTIVE FREQUENCY:1', type: SimVarValueType.MHz }],
    ['com1StandbyFreq', { name: 'COM STANDBY FREQUENCY:1', type: SimVarValueType.MHz }],
    ['com2ActiveFreq', { name: 'COM ACTIVE FREQUENCY:2', type: SimVarValueType.MHz }],
    ['com2StandbyFreq', { name: 'COM STANDBY FREQUENCY:2', type: SimVarValueType.MHz }],
    ['adf1StandbyFreq', { name: 'ADF STANDBY FREQUENCY:1', type: SimVarValueType.KHz }],
    ['adf1ActiveFreq', { name: 'ADF ACTIVE FREQUENCY:1', type: SimVarValueType.KHz }]
]);

/// <reference types="msfstypes/JS/simvar" />
var APLockType;
(function (APLockType) {
    APLockType[APLockType["Heading"] = 0] = "Heading";
    APLockType[APLockType["Nav"] = 1] = "Nav";
    APLockType[APLockType["Alt"] = 2] = "Alt";
    APLockType[APLockType["Bank"] = 3] = "Bank";
    APLockType[APLockType["WingLevel"] = 4] = "WingLevel";
    APLockType[APLockType["Vs"] = 5] = "Vs";
    APLockType[APLockType["Flc"] = 6] = "Flc";
    APLockType[APLockType["Pitch"] = 7] = "Pitch";
    APLockType[APLockType["Approach"] = 8] = "Approach";
    APLockType[APLockType["Backcourse"] = 9] = "Backcourse";
    APLockType[APLockType["Glideslope"] = 10] = "Glideslope";
    APLockType[APLockType["VNav"] = 11] = "VNav";
})(APLockType || (APLockType = {}));
/** base publisher for simvars */
class APSimVarPublisher extends SimVarPublisher {
    /**
     * Create an APSimVarPublisher
     * @param bus The EventBus to publish to
     * @param pacer An optional pacer to use to control the pace of publishing
     */
    constructor(bus, pacer = undefined) {
        super(APSimVarPublisher.simvars, bus, pacer);
    }
}
APSimVarPublisher.simvars = new Map([
    // TODO extend the next two to handle multiple APs?
    ['selected_heading', { name: 'AUTOPILOT HEADING LOCK DIR:1', type: SimVarValueType.Degree }],
    ['selected_altitude', { name: 'AUTOPILOT ALTITUDE LOCK VAR:1', type: SimVarValueType.Feet }],
    ['ap_master_status', { name: 'AUTOPILOT MASTER', type: SimVarValueType.Bool }],
    ['ap_heading_lock', { name: 'AUTOPILOT HEADING LOCK', type: SimVarValueType.Bool }],
    ['ap_nav_lock', { name: 'AUTOPILOT NAV1 LOCK', type: SimVarValueType.Bool }],
    ['ap_bank_hold', { name: 'AUTOPILOT BANK HOLD', type: SimVarValueType.Bool }],
    ['ap_wing_lvl', { name: 'AUTOPILOT WING LEVELER', type: SimVarValueType.Bool }],
    ['ap_approach_hold', { name: 'AUTOPILOT APPROACH HOLD', type: SimVarValueType.Bool }],
    ['ap_backcourse_hold', { name: 'AUTOPILOT BACKCOURSE HOLD', type: SimVarValueType.Bool }],
    ['ap_vs_hold', { name: 'AUTOPILOT VERTICAL HOLD', type: SimVarValueType.Bool }],
    ['ap_flc_hold', { name: 'AUTOPILOT FLIGHT LEVEL CHANGE', type: SimVarValueType.Bool }],
    ['ap_alt_lock', { name: 'AUTOPILOT ALTITUDE LOCK', type: SimVarValueType.Bool }],
    ['ap_glideslope_hold', { name: 'AUTOPILOT GLIDESLOPE HOLD', type: SimVarValueType.Bool }],
    ['ap_pitch_hold', { name: 'AUTOPILOT PITCH HOLD', type: SimVarValueType.Bool }],
    ['vs_hold_fpm', { name: 'AUTOPILOT VERTICAL HOLD VAR:1', type: SimVarValueType.FPM }],
    ['flc_hold_knots', { name: 'AUTOPILOT AIRSPEED HOLD VAR', type: SimVarValueType.Knots }],
    ['flight_director_bank', { name: 'AUTOPILOT FLIGHT DIRECTOR BANK', type: SimVarValueType.Degree }],
    ['flight_director_pitch', { name: 'AUTOPILOT FLIGHT DIRECTOR PITCH', type: SimVarValueType.Degree }],
    ['flight_director_lock', { name: 'AUTOPILOT FLIGHT DIRECTOR ACTIVE', type: SimVarValueType.Bool }],
    ['vnav_active', { name: 'L:XMLVAR_VNAVButtonValue', type: SimVarValueType.Bool }],
    ['alt_lock', { name: 'AUTOPILOT ALTITUDE LOCK', type: SimVarValueType.Bool }],
    ['pitch_ref', { name: 'AUTOPILOT PITCH HOLD REF', type: SimVarValueType.Degree }],
    ['kap_140_simvar', { name: 'L:WT1000_AP_KAP140_INSTALLED', type: SimVarValueType.Bool }]
]);

/// <reference types="msfstypes/JS/simvar" />
/**
 * A publisher for Engine information.
 */
class EISPublisher extends SimVarPublisher {
    /**
     * Create an EISPublisher
     * @param bus The EventBus to publish to
     * @param pacer An optional pacer to use to control the rate of publishing
     */
    constructor(bus, pacer = undefined) {
        const simvars = new Map(EISPublisher.simvars);
        // add engine-indexed simvars
        const engineCount = SimVar.GetSimVarValue('NUMBER OF ENGINES', SimVarValueType.Number);
        for (let i = 1; i <= engineCount; i++) {
            simvars.set(`fuel_flow_${i}`, { name: `ENG FUEL FLOW GPH:${i}`, type: SimVarValueType.GPH });
        }
        super(simvars, bus, pacer);
        this.engineCount = engineCount;
    }
    /** @inheritdoc */
    onUpdate() {
        super.onUpdate();
        if (this.subscribed.has('fuel_flow_total')) {
            let totalFuelFlow = 0;
            for (let i = 1; i <= this.engineCount; i++) {
                totalFuelFlow += SimVar.GetSimVarValue(`ENG FUEL FLOW GPH:${i}`, SimVarValueType.GPH);
            }
            this.publish('fuel_flow_total', totalFuelFlow);
        }
    }
}
EISPublisher.simvars = new Map([
    ['rpm_1', { name: 'GENERAL ENG RPM:1', type: SimVarValueType.RPM }],
    ['recip_ff_1', { name: 'RECIP ENG FUEL FLOW:1', type: SimVarValueType.PPH }],
    ['oil_press_1', { name: 'ENG OIL PRESSURE:1', type: SimVarValueType.PSI }],
    ['oil_temp_1', { name: 'ENG OIL TEMPERATURE:1', type: SimVarValueType.Farenheit }],
    ['egt_1', { name: 'ENG EXHAUST GAS TEMPERATURE:1', type: SimVarValueType.Farenheit }],
    ['vac', { name: 'SUCTION PRESSURE', type: SimVarValueType.InHG }],
    ['fuel_total', { name: 'FUEL TOTAL QUANTITY', type: SimVarValueType.GAL }],
    ['fuel_left', { name: 'FUEL LEFT QUANTITY', type: SimVarValueType.GAL }],
    ['fuel_right', { name: 'FUEL RIGHT QUANTITY', type: SimVarValueType.GAL }],
    ['eng_hours_1', { name: 'GENERAL ENG ELAPSED TIME:1', type: SimVarValueType.Hours }],
    ['elec_bus_main_v', { name: 'ELECTRICAL MAIN BUS VOLTAGE', type: SimVarValueType.Volts }],
    ['elec_bus_main_a', { name: 'ELECTRICAL MAIN BUS AMPS', type: SimVarValueType.Amps }],
    ['elec_bus_avionics_v', { name: 'ELECTRICAL AVIONICS BUS VOLTAGE', type: SimVarValueType.Volts }],
    ['elec_bus_avionics_a', { name: 'ELECTRICAL AVIONICS BUS AMPS', type: SimVarValueType.Amps }],
    ['elec_bus_genalt_1_v', { name: 'ELECTRICAL GENALT BUS VOLTAGE:1', type: SimVarValueType.Volts }],
    ['elec_bus_genalt_1_a', { name: 'ELECTRICAL GENALT BUS AMPS:1', type: SimVarValueType.Amps }],
    ['elec_bat_a', { name: 'ELECTRICAL BATTERY LOAD', type: SimVarValueType.Amps }],
    ['elec_bat_v', { name: 'ELECTRICAL BATTERY VOLTAGE', type: SimVarValueType.Volts }]
]);

/** Transponder modes. */
var XPDRMode;
(function (XPDRMode) {
    XPDRMode[XPDRMode["OFF"] = 0] = "OFF";
    XPDRMode[XPDRMode["STBY"] = 1] = "STBY";
    XPDRMode[XPDRMode["TEST"] = 2] = "TEST";
    XPDRMode[XPDRMode["ON"] = 3] = "ON";
    XPDRMode[XPDRMode["ALT"] = 4] = "ALT";
    XPDRMode[XPDRMode["GROUND"] = 5] = "GROUND";
})(XPDRMode || (XPDRMode = {}));
/** A publiher to poll transponder simvars. */
class XPDRSimVarPublisher extends SimVarPublisher {
    /**
     * Create an XPDRSimVarPublisher
     * @param bus The EventBus to publish to
     * @param pacer An optional pacer to use to control the pace of publishing
     */
    constructor(bus, pacer = undefined) {
        super(XPDRSimVarPublisher.simvars, bus, pacer);
    }
}
XPDRSimVarPublisher.simvars = new Map([
    ['xpdrMode1', { name: 'TRANSPONDER STATE:1', type: SimVarValueType.Number }],
    ['xpdrCode1', { name: 'TRANSPONDER CODE:1', type: SimVarValueType.Number }],
    ['xpdrIdent', { name: 'TRANSPONDER IDENT:1', type: SimVarValueType.Bool }]
]);

new GeoPoint(0, 0);

/// <reference types="msfstypes/JS/simvar" />
/**
 * A publisher for electrical information.
 */
class ElectricalPublisher extends SimVarPublisher {
    /**
     * Create an ElectricalPublisher
     * @param bus The EventBus to publish to
     * @param pacer An optional pacer to use to control the rate of publishing
     */
    constructor(bus, pacer = undefined) {
        super(ElectricalPublisher.simvars, bus, pacer);
    }
    /** @inheritdoc */
    onUpdate() {
        super.onUpdate();
        if (this.av1BusLogic && this.subscribed.has('elec_av1_bus')) {
            this.publish('elec_av1_bus', this.av1BusLogic.getValue() !== 0);
        }
        if (this.av2BusLogic && this.subscribed.has('elec_av2_bus')) {
            this.publish('elec_av2_bus', this.av2BusLogic.getValue() !== 0);
        }
    }
    /**
     * Sets the logic element to use for the avionics 1 bus.
     * @param logicElement The logic element to use.
     */
    setAv1Bus(logicElement) {
        this.av1BusLogic = logicElement;
    }
    /**
     * Sets the logic element to use for the avionics 2 bus.
     * @param logicElement The logic element to use.
     */
    setAv2Bus(logicElement) {
        this.av2BusLogic = logicElement;
    }
}
ElectricalPublisher.simvars = new Map([
    ['elec_master_battery', { name: 'ELECTRICAL MASTER BATTERY', type: SimVarValueType.Bool }],
    ['elec_circuit_avionics_on', { name: 'CIRCUIT AVIONICS ON', type: SimVarValueType.Bool }],
    ['elec_circuit_navcom1_on', { name: 'CIRCUIT NAVCOM1 ON', type: SimVarValueType.Bool }],
    ['elec_circuit_navcom2_on', { name: 'CIRCUIT NAVCOM2 ON', type: SimVarValueType.Bool }],
    ['elec_circuit_navcom3_on', { name: 'CIRCUIT NAVCOM3 ON', type: SimVarValueType.Bool }]
]);

/**
 * The transition type to which a flight path vector belongs.
 */
var FlightPathVectorFlags;
(function (FlightPathVectorFlags) {
    FlightPathVectorFlags[FlightPathVectorFlags["None"] = 0] = "None";
    FlightPathVectorFlags[FlightPathVectorFlags["TurnToCourse"] = 1] = "TurnToCourse";
    FlightPathVectorFlags[FlightPathVectorFlags["Arc"] = 2] = "Arc";
    FlightPathVectorFlags[FlightPathVectorFlags["HoldEntry"] = 4] = "HoldEntry";
    FlightPathVectorFlags[FlightPathVectorFlags["HoldLeg"] = 8] = "HoldLeg";
    FlightPathVectorFlags[FlightPathVectorFlags["CourseReversal"] = 16] = "CourseReversal";
    FlightPathVectorFlags[FlightPathVectorFlags["LegToLegTurn"] = 32] = "LegToLegTurn";
    FlightPathVectorFlags[FlightPathVectorFlags["AnticipatedTurn"] = 64] = "AnticipatedTurn";
})(FlightPathVectorFlags || (FlightPathVectorFlags = {}));
/**
 * A prototype for signalling application-specific type metadata for plan segments.
 */
var FlightPlanSegmentType;
(function (FlightPlanSegmentType) {
    FlightPlanSegmentType["Origin"] = "Origin";
    FlightPlanSegmentType["Departure"] = "Departure";
    FlightPlanSegmentType["Enroute"] = "Enroute";
    FlightPlanSegmentType["Arrival"] = "Arrival";
    FlightPlanSegmentType["Approach"] = "Approach";
    FlightPlanSegmentType["Destination"] = "Destination";
    FlightPlanSegmentType["MissedApproach"] = "MissedApproach";
    FlightPlanSegmentType["RandomDirectTo"] = "RandomDirectTo";
})(FlightPlanSegmentType || (FlightPlanSegmentType = {}));
/**
 * A segment of a flight plan.
 */
class FlightPlanSegment {
    /**
     * Creates a new FlightPlanSegment.
     * @param segmentIndex The index of the segment within the flight plan.
     * @param offset The leg offset within the original flight plan that
     * the segment starts at.
     * @param legs The legs in the flight plan segment.
     * @param segmentType The type of segment this is.
     * @param airway The airway associated with this segment, if any.
     */
    constructor(segmentIndex, offset, legs, segmentType = FlightPlanSegmentType.Enroute, airway) {
        this.segmentIndex = segmentIndex;
        this.offset = offset;
        this.legs = legs;
        this.segmentType = segmentType;
        this.airway = airway;
    }
}
/** An empty flight plan segment. */
FlightPlanSegment.Empty = new FlightPlanSegment(-1, -1, []);
/**
 * Bitflags describing a leg definition.
 */
var LegDefinitionFlags;
(function (LegDefinitionFlags) {
    LegDefinitionFlags[LegDefinitionFlags["None"] = 0] = "None";
    LegDefinitionFlags[LegDefinitionFlags["DirectTo"] = 1] = "DirectTo";
    LegDefinitionFlags[LegDefinitionFlags["MissedApproach"] = 2] = "MissedApproach";
    LegDefinitionFlags[LegDefinitionFlags["Obs"] = 4] = "Obs";
    LegDefinitionFlags[LegDefinitionFlags["VectorsToFinal"] = 8] = "VectorsToFinal";
})(LegDefinitionFlags || (LegDefinitionFlags = {}));

[new GeoPoint(0, 0), new GeoPoint(0, 0)];
[new GeoCircle(new Float64Array(3), 0)];

/* eslint-disable @typescript-eslint/no-non-null-assertion */
[new GeoPoint(0, 0), new GeoPoint(0, 0)];
[new GeoCircle(new Float64Array(3), 0)];
[new GeoPoint(0, 0), new GeoPoint(0, 0), new GeoPoint(0, 0)];
[new GeoCircle(new Float64Array(3), 0)];
[new GeoPoint(0, 0), new GeoPoint(0, 0), new GeoPoint(0, 0)];
[new GeoCircle(new Float64Array(3), 0)];
[new GeoCircle(new Float64Array(3), 0), new GeoCircle(new Float64Array(3), 0)];
[
    new GeoCircle(new Float64Array(3), 0),
    new GeoCircle(new Float64Array(3), 0),
    new GeoCircle(new Float64Array(3), 0),
    new GeoCircle(new Float64Array(3), 0),
    new GeoCircle(new Float64Array(3), 0)
];
[new GeoCircle(new Float64Array(3), 0), new GeoCircle(new Float64Array(3), 0), new GeoCircle(new Float64Array(3), 0)];
[new GeoCircle(new Float64Array(3), 0), new GeoCircle(new Float64Array(3), 0), new GeoCircle(new Float64Array(3), 0)];
[
    new GeoPoint(0, 0), new GeoPoint(0, 0), new GeoPoint(0, 0), new GeoPoint(0, 0), new GeoPoint(0, 0),
    new GeoPoint(0, 0), new GeoPoint(0, 0), new GeoPoint(0, 0), new GeoPoint(0, 0), new GeoPoint(0, 0)
];
[new GeoCircle(new Float64Array(3), 0)];

[new GeoPoint(0, 0), new GeoPoint(0, 0), new GeoPoint(0, 0), new GeoPoint(0, 0), new GeoPoint(0, 0)];
[
    new GeoCircle(new Float64Array(3), 0), new GeoCircle(new Float64Array(3), 0),
    new GeoCircle(new Float64Array(3), 0), new GeoCircle(new Float64Array(3), 0)
];
[new GeoPoint(0, 0), new GeoPoint(0, 0)];
({
    geoPoint: [new GeoPoint(0, 0), new GeoPoint(0, 0), new GeoPoint(0, 0), new GeoPoint(0, 0), new GeoPoint(0, 0)],
    geoCircle: [new GeoCircle(new Float64Array(3), 0), new GeoCircle(new Float64Array(3), 0)]
});

var PlanChangeType;
(function (PlanChangeType) {
    PlanChangeType["Added"] = "Added";
    PlanChangeType["Inserted"] = "Inserted";
    PlanChangeType["Removed"] = "Removed";
    PlanChangeType["Changed"] = "Changed";
    PlanChangeType["Cleared"] = "Cleared";
})(PlanChangeType || (PlanChangeType = {}));
var ActiveLegType;
(function (ActiveLegType) {
    ActiveLegType["Lateral"] = "Lateral";
    ActiveLegType["Vertical"] = "Vertical";
    ActiveLegType["Calculating"] = "Calculating";
})(ActiveLegType || (ActiveLegType = {}));
var OriginDestChangeType;
(function (OriginDestChangeType) {
    OriginDestChangeType["OriginAdded"] = "OriginAdded";
    OriginDestChangeType["OriginRemoved"] = "OriginRemoved";
    OriginDestChangeType["DestinationAdded"] = "DestinationAdded";
    OriginDestChangeType["DestinationRemoved"] = "DestinationRemoved";
})(OriginDestChangeType || (OriginDestChangeType = {}));

/**
 * TCAS operating modes.
 */
var TCASOperatingMode;
(function (TCASOperatingMode) {
    TCASOperatingMode[TCASOperatingMode["Standby"] = 0] = "Standby";
    TCASOperatingMode[TCASOperatingMode["TAOnly"] = 1] = "TAOnly";
    TCASOperatingMode[TCASOperatingMode["TA_RA"] = 2] = "TA_RA";
})(TCASOperatingMode || (TCASOperatingMode = {}));
/**
 * TCAS alert level.
 */
var TCASAlertLevel;
(function (TCASAlertLevel) {
    TCASAlertLevel[TCASAlertLevel["None"] = 0] = "None";
    TCASAlertLevel[TCASAlertLevel["ProximityAdvisory"] = 1] = "ProximityAdvisory";
    TCASAlertLevel[TCASAlertLevel["TrafficAdvisory"] = 2] = "TrafficAdvisory";
    TCASAlertLevel[TCASAlertLevel["ResolutionAdvisory"] = 3] = "ResolutionAdvisory";
})(TCASAlertLevel || (TCASAlertLevel = {}));
UnitType.KNOT.createNumber(30);

var APVerticalModes;
(function (APVerticalModes) {
    APVerticalModes[APVerticalModes["NONE"] = 0] = "NONE";
    APVerticalModes[APVerticalModes["PITCH"] = 1] = "PITCH";
    APVerticalModes[APVerticalModes["VS"] = 2] = "VS";
    APVerticalModes[APVerticalModes["FLC"] = 3] = "FLC";
    APVerticalModes[APVerticalModes["ALT"] = 4] = "ALT";
    APVerticalModes[APVerticalModes["VNAV"] = 5] = "VNAV";
    APVerticalModes[APVerticalModes["GP"] = 6] = "GP";
    APVerticalModes[APVerticalModes["GS"] = 7] = "GS";
    APVerticalModes[APVerticalModes["CAP"] = 8] = "CAP";
})(APVerticalModes || (APVerticalModes = {}));
var APLateralModes;
(function (APLateralModes) {
    APLateralModes[APLateralModes["NONE"] = 0] = "NONE";
    APLateralModes[APLateralModes["ROLL"] = 1] = "ROLL";
    APLateralModes[APLateralModes["LEVEL"] = 2] = "LEVEL";
    APLateralModes[APLateralModes["GPSS"] = 3] = "GPSS";
    APLateralModes[APLateralModes["HEADING"] = 4] = "HEADING";
    APLateralModes[APLateralModes["VOR"] = 5] = "VOR";
    APLateralModes[APLateralModes["LOC"] = 6] = "LOC";
    APLateralModes[APLateralModes["BC"] = 7] = "BC";
    APLateralModes[APLateralModes["NAV"] = 8] = "NAV";
})(APLateralModes || (APLateralModes = {}));
var APAltitudeModes;
(function (APAltitudeModes) {
    APAltitudeModes[APAltitudeModes["NONE"] = 0] = "NONE";
    APAltitudeModes[APAltitudeModes["ALTS"] = 1] = "ALTS";
    APAltitudeModes[APAltitudeModes["ALTV"] = 2] = "ALTV";
})(APAltitudeModes || (APAltitudeModes = {}));

/** AP Mode Types */
var APModeType;
(function (APModeType) {
    APModeType[APModeType["LATERAL"] = 0] = "LATERAL";
    APModeType[APModeType["VERTICAL"] = 1] = "VERTICAL";
    APModeType[APModeType["APPROACH"] = 2] = "APPROACH";
})(APModeType || (APModeType = {}));

var APStates;
(function (APStates) {
    APStates[APStates["None"] = 0] = "None";
    APStates[APStates["APActive"] = 1] = "APActive";
    APStates[APStates["YawDamper"] = 2] = "YawDamper";
    APStates[APStates["Heading"] = 4] = "Heading";
    APStates[APStates["Nav"] = 8] = "Nav";
    APStates[APStates["NavArmed"] = 16] = "NavArmed";
    APStates[APStates["Approach"] = 32] = "Approach";
    APStates[APStates["ApproachArmed"] = 64] = "ApproachArmed";
    APStates[APStates["Backcourse"] = 128] = "Backcourse";
    APStates[APStates["BackcourseArmed"] = 256] = "BackcourseArmed";
    APStates[APStates["Alt"] = 512] = "Alt";
    APStates[APStates["AltS"] = 1024] = "AltS";
    APStates[APStates["AltV"] = 2048] = "AltV";
    APStates[APStates["VS"] = 4096] = "VS";
    APStates[APStates["FLC"] = 8192] = "FLC";
    APStates[APStates["GP"] = 16384] = "GP";
    APStates[APStates["GPArmed"] = 32768] = "GPArmed";
    APStates[APStates["GS"] = 65536] = "GS";
    APStates[APStates["GSArmed"] = 131072] = "GSArmed";
    APStates[APStates["Path"] = 262144] = "Path";
    APStates[APStates["PathArmed"] = 524288] = "PathArmed";
    APStates[APStates["PathInvalid"] = 1048576] = "PathInvalid";
    APStates[APStates["Pitch"] = 2097152] = "Pitch";
    APStates[APStates["Roll"] = 4194304] = "Roll";
    APStates[APStates["VNAV"] = 8388608] = "VNAV";
    APStates[APStates["ATSpeed"] = 16777216] = "ATSpeed";
    APStates[APStates["ATMach"] = 33554432] = "ATMach";
    APStates[APStates["ATArmed"] = 67108864] = "ATArmed";
    APStates[APStates["FD"] = 134217728] = "FD";
})(APStates || (APStates = {}));

/**
 * The state of a given plane director.
 */
var DirectorState;
(function (DirectorState) {
    /** The plane director is not currently armed or active. */
    DirectorState["Inactive"] = "Inactive";
    /** The plane director is currently armed. */
    DirectorState["Armed"] = "Armed";
    /** The plane director is currently active. */
    DirectorState["Active"] = "Active";
})(DirectorState || (DirectorState = {}));
/* eslint-disable @typescript-eslint/no-empty-function */
/**
 * A plane director that provides no behavior.
 */
class EmptyDirector {
    constructor() {
        /** No-op. */
        this.onActivate = () => { };
        /** No-op */
        this.onArm = () => { };
        this.state = DirectorState.Inactive;
    }
    /** No-op. */
    activate() { }
    /** No-op. */
    deactivate() { }
    /** No-op. */
    update() { }
    /** No-op. */
    arm() { }
}
/** An instance of the empty plane director. */
EmptyDirector.instance = new EmptyDirector();

/**
 * The current vertical navigation state.
 */
var VNavMode;
(function (VNavMode) {
    /** VNAV Disabled. */
    VNavMode[VNavMode["Disabled"] = 0] = "Disabled";
    /** VNAV Enabled. */
    VNavMode[VNavMode["Enabled"] = 1] = "Enabled";
})(VNavMode || (VNavMode = {}));
/**
 * The current VNAV path mode.
 */
var VNavPathMode;
(function (VNavPathMode) {
    /** VNAV path is not active. */
    VNavPathMode[VNavPathMode["None"] = 0] = "None";
    /** VNAV path is armed for capture. */
    VNavPathMode[VNavPathMode["PathArmed"] = 1] = "PathArmed";
    /** VNAV path is actively navigating. */
    VNavPathMode[VNavPathMode["PathActive"] = 2] = "PathActive";
    /** The current VNAV path is not valid. */
    VNavPathMode[VNavPathMode["PathInvalid"] = 3] = "PathInvalid";
})(VNavPathMode || (VNavPathMode = {}));
/**
 * The current VNAV approach guidance mode.
 */
var VNavApproachGuidanceMode;
(function (VNavApproachGuidanceMode) {
    /** VNAV is not currently following approach guidance. */
    VNavApproachGuidanceMode[VNavApproachGuidanceMode["None"] = 0] = "None";
    /** VNAV has armed ILS glideslope guidance for capture. */
    VNavApproachGuidanceMode[VNavApproachGuidanceMode["GSArmed"] = 1] = "GSArmed";
    /** VNAV is actively following ILS glideslope guidance. */
    VNavApproachGuidanceMode[VNavApproachGuidanceMode["GSActive"] = 2] = "GSActive";
    /** VNAV RNAV glidepath guidance is armed for capture. */
    VNavApproachGuidanceMode[VNavApproachGuidanceMode["GPArmed"] = 3] = "GPArmed";
    /** VNAV is actively follow RNAV glidepath guidance. */
    VNavApproachGuidanceMode[VNavApproachGuidanceMode["GPActive"] = 4] = "GPActive";
})(VNavApproachGuidanceMode || (VNavApproachGuidanceMode = {}));
/**
 * The current VNAV altitude capture type.
 */
var VNavAltCaptureType;
(function (VNavAltCaptureType) {
    /** Altitude capture is not armed. */
    VNavAltCaptureType[VNavAltCaptureType["None"] = 0] = "None";
    /** Altitude will capture the selected altitude. */
    VNavAltCaptureType[VNavAltCaptureType["Selected"] = 1] = "Selected";
    /** Altitude will capture the VANV target altitude. */
    VNavAltCaptureType[VNavAltCaptureType["VNAV"] = 2] = "VNAV";
})(VNavAltCaptureType || (VNavAltCaptureType = {}));

/**
 * Copyright (C) 2022 Salty Simulations and its contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */
class BlackOutlineLine extends DisplayComponent {
    render() {
        var _a, _b, _c, _d, _e;
        return (FSComponent.buildComponent(FSComponent.Fragment, null,
            FSComponent.buildComponent("path", { stroke: "black", "stroke-width": (_a = this.props.blackStroke) !== null && _a !== void 0 ? _a : 4, "stroke-linecap": "round", d: this.props.d, style: (_b = this.props.styleBlack) !== null && _b !== void 0 ? _b : "", "stroke-linejoin": "round" }),
            FSComponent.buildComponent("path", { stroke: (_c = this.props.color) !== null && _c !== void 0 ? _c : "white", "stroke-width": (_d = this.props.whiteStroke) !== null && _d !== void 0 ? _d : 3, "stroke-linecap": "round", d: this.props.d, style: (_e = this.props.styleColor) !== null && _e !== void 0 ? _e : "", "stroke-linejoin": "round" })));
    }
}

/**
 * Copyright (C) 2022 Salty Simulations and its contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */
class SlipIndicator extends DisplayComponent {
    constructor() {
        super(...arguments);
        this.slipGroup = FSComponent.createRef();
        this.fillOpacity = Subject.create(0);
    }
    angleToDisplacement(sideslip) {
        return Math.min(sideslip * 1.25, 33);
    }
    onAfterRender(node) {
        super.onAfterRender(node);
        const sub = this.props.bus.getSubscriber();
        sub.on("sideslip")
            .whenChangedBy(0.05)
            .handle((sideslip) => {
            const angle = this.angleToDisplacement(sideslip);
            this.slipGroup.instance.style.transform = `translate(${angle}px, 0px)`;
            this.fillOpacity.set(Math.abs(angle) >= 33 ? 1 : 0);
        });
    }
    render() {
        return (FSComponent.buildComponent("g", { ref: this.slipGroup },
            FSComponent.buildComponent("path", { fill: "none", stroke: "black", "stroke-width": "4", d: "M333 214, h32, v 6, h-32, Z", "stroke-linejoin": "round" }),
            FSComponent.buildComponent("path", { fill: this.props.colour, "fill-opacity": this.fillOpacity, stroke: this.props.colour, "stroke-width": "3", d: "M333 214, h32, v 6, h-32, Z", "stroke-linejoin": "round" })));
    }
}

/**
 * Copyright (C) 2022 Salty Simulations and its contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */
class BankIndicator extends DisplayComponent {
    constructor() {
        super(...arguments);
        this.strokeColour = Subject.create("none");
    }
    onAfterRender(node) {
        super.onAfterRender(node);
        this.props.colour.sub((colour) => {
            this.strokeColour.set(colour === "white" ? "none" : "#ffc400");
        });
    }
    render() {
        return (FSComponent.buildComponent(FSComponent.Fragment, null,
            FSComponent.buildComponent("path", { fill: "none", stroke: "black", "stroke-width": "4", d: "M349 194, l-16 20, h32, Z", "stroke-linejoin": "round" }),
            FSComponent.buildComponent("path", { fill: this.strokeColour, stroke: this.props.colour, "stroke-width": "3", d: "M349 194, l-16 20, h32, Z", "stroke-linejoin": "round" })));
    }
}

/**
 * Copyright (C) 2022 Salty Simulations and its contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */
class PitchLimitIndicator extends DisplayComponent {
    constructor() {
        super(...arguments);
        this.airspeed = 0;
        this.maneuveringSpeed = 0;
        this.flapsHandle = 0;
        this.altAboveGround = 0;
        this.incidenceAlpha = 0;
        this.stallAlpha = 0;
        this.pliTransformRef = FSComponent.createRef();
        this.visibility = Subject.create("hidden");
    }
    // TODO: airspeed logic for flaps up pli
    pliPitch(alpha, stallAlpha) {
        return stallAlpha - alpha;
    }
    isPliOn(airspeed, manSpeed, flapsHandle, alt) {
        return (airspeed < manSpeed || flapsHandle != 0) && alt > 10;
    }
    degreesToPixels(angle) {
        return angle < 0 ? Math.max(angle * 8, -12 * 8) : Math.min(angle * 8, 12 * 8);
    }
    handlePitchLimitTransform() {
        this.pliTransformRef.instance.style.transform = `translate(0px, ${this.degreesToPixels(Math.max(-1 * this.pliPitch(this.incidenceAlpha, this.stallAlpha), -30))}px)`;
    }
    handleVisibility() {
        this.visibility.set(this.isPliOn(this.airspeed, this.maneuveringSpeed, this.flapsHandle, this.altAboveGround) ? "visible" : "hidden");
    }
    // wondering how i'm gonna find a way
    // it's over
    onAfterRender(node) {
        super.onAfterRender(node);
        const sub = this.props.bus.getSubscriber();
        sub.on("airspeed")
            .whenChangedBy(0.0625)
            .handle((airspeed) => {
            this.airspeed = airspeed;
            this.handleVisibility();
        });
        sub.on("maneuveringSpeed")
            .whenChangedBy(0.25)
            .handle((manSpeed) => {
            this.maneuveringSpeed = manSpeed;
            this.handleVisibility();
        });
        sub.on("flapsHandle")
            .whenChanged()
            .handle((flaps) => {
            this.flapsHandle = flaps;
            this.handleVisibility();
        });
        sub.on("altAboveGround")
            .withPrecision(1)
            .handle((altitude) => {
            this.altAboveGround = altitude;
            this.handleVisibility();
        });
        sub.on("incidenceAlpha")
            .whenChangedBy(0.05)
            .handle((alpha) => {
            this.incidenceAlpha = alpha;
            this.handlePitchLimitTransform();
        });
        sub.on("stallAlpha")
            .whenChangedBy(0.05)
            .handle((stallAlpha) => {
            this.stallAlpha = stallAlpha;
            this.handlePitchLimitTransform();
        });
    }
    render() {
        return (FSComponent.buildComponent("g", { ref: this.pliTransformRef, visibility: this.visibility },
            FSComponent.buildComponent(BlackOutlineLine, { d: "M416 382, h33, m 0 0, h-8, l9 -14, m-9 14, m-9 0, l9 -14, m-18 14, l9 -14, m-17 14, v10", blackStroke: 5, color: "#ffc400", styleBlack: "fill: none;", styleColor: "fill: none;" }),
            FSComponent.buildComponent(BlackOutlineLine, { d: "M282 382, h-33, m 0 0, h8, l-9 -14, m9 14, m9 0, l-9 -14, m18 14, l-9 -14, m17 14, v10", blackStroke: 5, color: "#ffc400", styleBlack: "fill: none;", styleColor: "fill: none;" })));
    }
}

/**
 * Copyright (C) 2022 Salty Simulations and its contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */
class FlightDirector extends DisplayComponent {
    constructor() {
        super(...arguments);
        this.pitch = 0;
        this.roll = 0;
        this.height = 0;
        this.fdPitch = 0;
        this.fdRoll = 0;
        this.irsState = 0;
        this.fdOn = false;
        this.pitchGroup = FSComponent.createRef();
        this.rollGroup = FSComponent.createRef();
        this.visibility = Subject.create("hidden");
    }
    degreesToPixels(angle) {
        return angle < 0 ? Math.max(angle * 8, -12 * 8) : Math.min(angle * 8, 12 * 8);
    }
    handleTransform() {
        this.pitchGroup.instance.style.transform = `translate(0px, ${this.degreesToPixels((this.height < 5 ? -8 : this.fdPitch) - this.pitch)}px)`;
        this.rollGroup.instance.style.transform = `translate(${this.degreesToPixels((-this.fdRoll + this.roll) / 4)}px, 0px)`;
    }
    onAfterRender(node) {
        super.onAfterRender(node);
        const sub = this.props.bus.getSubscriber();
        sub.on("pitch")
            .withPrecision(2)
            .handle((pitch) => {
            this.pitch = pitch;
            this.handleTransform();
        });
        sub.on("roll")
            .withPrecision(2)
            .handle((roll) => {
            this.roll = roll;
            this.handleTransform();
        });
        sub.on("altAboveGround")
            .withPrecision(1)
            .handle((height) => {
            this.height = height;
            this.handleTransform();
        });
        sub.on("fdPitch")
            .whenChangedBy(0.05)
            .handle((fdPitch) => {
            this.fdPitch = fdPitch;
            this.handleTransform();
        });
        sub.on("fdRoll")
            .whenChangedBy(0.05)
            .handle((fdRoll) => {
            this.fdRoll = fdRoll;
            this.handleTransform();
        });
        sub.on("irsState")
            .whenChanged()
            .handle((irsState) => {
            this.irsState = irsState;
            this.visibility.set(this.fdOn && this.irsState === 2 ? "visible" : "hidden");
        });
        sub.on("fdOn")
            .whenChanged()
            .handle((fdOn) => {
            this.fdOn = fdOn;
            this.visibility.set(this.fdOn && this.irsState === 2 ? "visible" : "hidden");
        });
    }
    render() {
        return (FSComponent.buildComponent("g", null,
            FSComponent.buildComponent("g", { ref: this.pitchGroup, visibility: this.visibility },
                FSComponent.buildComponent(BlackOutlineLine, { d: "M239 382, h220", color: "#d570ff", whiteStroke: 5, blackStroke: 7 })),
            FSComponent.buildComponent("g", { ref: this.rollGroup, visibility: this.visibility },
                FSComponent.buildComponent(BlackOutlineLine, { d: "M349 272, v220", color: "#d570ff", whiteStroke: 5, blackStroke: 7 }))));
    }
}

/**
 * Copyright (C) 2022 Salty Simulations and its contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */
class FlightPathVector extends DisplayComponent {
    constructor() {
        super(...arguments);
        this.groundSpeed = 0;
        this.verticalVelocity = 0;
        this.horizontalVelocity = 0;
        this.pitch = 0;
        this.heading = 0;
        this.track = 0;
        this.irsState = 0;
        this.isFpvOn = false;
        this.fpvTransformRef = FSComponent.createRef();
        this.fpvRotateSub = Subject.create("rotate(0deg)");
        this.visibility = Subject.create("hidden");
        this.fpvFailVisibility = Subject.create("hidden");
    }
    degreesToPixels(angle) {
        let newAngle = angle;
        if (this.groundSpeed < 1) {
            newAngle = 0;
        }
        return newAngle < 0 ? Math.max(newAngle * 8, -16 * 8) : Math.min(newAngle * 8, 22.5 * 8);
    }
    vertVecToPixels() {
        const fpa = (180 / Math.PI) * Math.asin(this.verticalVelocity / 60 / (this.horizontalVelocity / 60));
        return this.degreesToPixels(this.groundSpeed < 1 ? 0 : fpa + this.pitch);
    }
    trackToPixels() {
        let driftAngle = this.heading - this.track;
        if (driftAngle > 180) {
            driftAngle -= 360;
        }
        else if (driftAngle < -180) {
            driftAngle += 360;
        }
        driftAngle = driftAngle > 0 ? Math.min(driftAngle, 35) : Math.max(driftAngle, -35);
        return this.degreesToPixels(driftAngle * -0.25);
    }
    handleTransform() {
        this.fpvTransformRef.instance.style.transform = `translate(${this.trackToPixels()}px, ${-this.vertVecToPixels()}px)`;
    }
    onAfterRender(node) {
        super.onAfterRender(node);
        const sub = this.props.bus.getSubscriber();
        sub.on("groundSpeed")
            .whenChangedBy(0.125)
            .handle((gs) => {
            this.groundSpeed = gs;
            this.handleTransform();
        });
        sub.on("verticalVelocity")
            .withPrecision(1)
            .handle((verticalVelocity) => {
            this.verticalVelocity = verticalVelocity;
            this.handleTransform();
        });
        sub.on("horizontalVelocity")
            .withPrecision(1)
            .handle((horizontalVelocity) => {
            this.horizontalVelocity = horizontalVelocity;
            this.handleTransform();
        });
        sub.on("pitch")
            .withPrecision(2)
            .handle((pitch) => {
            this.pitch = pitch;
            this.handleTransform();
        });
        sub.on("trueHeading")
            .whenChangedBy(0.05)
            .handle((heading) => {
            this.heading = heading;
            this.handleTransform();
        });
        sub.on("trueTrack")
            .whenChangedBy(0.05)
            .handle((track) => {
            this.track = track;
            this.handleTransform();
        });
        sub.on("roll")
            .withPrecision(2)
            .handle((roll) => this.fpvRotateSub.set(`rotate(${-roll}deg)`));
        sub.on("irsState")
            .whenChanged()
            .handle((state) => {
            this.irsState = state;
            this.visibility.set(this.irsState === 2 && this.isFpvOn ? "visible" : "hidden");
            this.fpvFailVisibility.set(this.irsState === 0 && this.isFpvOn ? "visible" : "hidden");
        });
        sub.on("fpvOn")
            .whenChanged()
            .handle((fpvOn) => {
            this.isFpvOn = fpvOn;
            this.visibility.set(this.irsState === 2 && this.isFpvOn ? "visible" : "hidden");
            this.fpvFailVisibility.set(this.irsState === 0 && this.isFpvOn ? "visible" : "hidden");
        });
        const hEventSub = this.props.bus.getSubscriber();
        hEventSub.on("hEvent").handle((event) => {
            if (event === "B747_8_PFD_FPV") {
                SimVar.SetSimVarValue("L:SALTY_FPV_ON", "Bool", !this.isFpvOn);
            }
        });
    }
    render() {
        return (FSComponent.buildComponent("g", null,
            FSComponent.buildComponent("g", { ref: this.fpvTransformRef },
                FSComponent.buildComponent("g", { transform: this.fpvRotateSub, class: "horizon-group", visibility: this.visibility },
                    FSComponent.buildComponent("path", { class: "fpv-outline", d: "M311 382, h28" }),
                    FSComponent.buildComponent("path", { class: "fpv-outline", d: "M359 382, h28" }),
                    FSComponent.buildComponent("path", { class: "fpv-outline", d: "M349 372, v-14" }),
                    FSComponent.buildComponent("circle", { class: "fpv-outline", cx: "349", cy: "382", r: "10", stroke: "white", fill: "none" }),
                    FSComponent.buildComponent("path", { class: "fpv-line", d: "M311 382, h28" }),
                    FSComponent.buildComponent("path", { class: "fpv-line", d: "M359 382, h28" }),
                    FSComponent.buildComponent("path", { class: "fpv-line", d: "M349 372, v-14" }),
                    FSComponent.buildComponent("circle", { class: "fpv-line", cx: "349", cy: "382", r: "10", fill: "none" }))),
            FSComponent.buildComponent("g", { visibility: this.fpvFailVisibility },
                FSComponent.buildComponent("rect", { x: "196", y: "270", width: "52", height: "27", class: "line", fill: "none", "stroke-width": "3", stroke: "#ffc400" }),
                FSComponent.buildComponent("text", { x: "222", y: "294", class: "text-3 amber middle" }, "FPV"))));
    }
}

/**
 * Copyright (C) 2022 Salty Simulations and its contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */
class MarkerBeacon extends DisplayComponent {
    constructor() {
        super(...arguments);
        this.classSub = Subject.create("hidden");
        this.colourSub = Subject.create("");
        this.textSub = Subject.create("");
        this.markers = [
            ["", "", "hidden"],
            ["cyan", "OM", "outer-marker-blink"],
            ["#ffc400", "MM", "middle-marker-blink"],
            ["white", "IM", "inner-marker-blink"],
        ];
    }
    onAfterRender(node) {
        super.onAfterRender(node);
        const sub = this.props.bus.getSubscriber();
        sub.on("markerBeaconState")
            .whenChanged()
            .handle((state) => {
            this.colourSub.set(this.markers[state][0]);
            this.textSub.set(this.markers[state][1]);
            this.classSub.set(this.markers[state][2]);
        });
    }
    render() {
        return (FSComponent.buildComponent("g", { class: this.classSub },
            FSComponent.buildComponent("circle", { cx: "507", cy: "213", r: "20", fill: "black", class: "fpv-outline" }),
            FSComponent.buildComponent("circle", { cx: "507", cy: "213", r: "20", fill: "black", "stroke-width": "3px", stroke: this.colourSub }),
            FSComponent.buildComponent("text", { x: "507", y: "224", "font-size": "30", "letter-spacing": "-0.25", "text-anchor": "middle", stroke: "black", "stroke-width": "1.5px", "paint-order": "stroke", fillOpacity: 0.9, fill: this.colourSub }, this.textSub)));
    }
}

/**
 * Copyright (C) 2022 Salty Simulations and its contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */
class Horizon extends DisplayComponent {
    constructor() {
        super(...arguments);
        this.horizonPitchGroup = FSComponent.createRef();
        this.horizonRollGroup = FSComponent.createRef();
        this.clipRef = FSComponent.createRef();
        this.horizonVisibility = Subject.create("visible");
        this.horizonFailVisibility = Subject.create("hidden");
    }
    onAfterRender(node) {
        super.onAfterRender(node);
        const sub = this.props.bus.getSubscriber();
        sub.on("pitch")
            .withPrecision(2)
            .handle((pitch) => {
            this.horizonPitchGroup.instance.style.transform = `translate(0px, -18px) translate(0px, ${-pitch * 8}px)`;
            this.clipRef.instance.style.transform = `translate(0px, 18px) translate(0px, ${pitch * 8}px)`;
        });
        sub.on("roll")
            .withPrecision(2)
            .handle((roll) => (this.horizonRollGroup.instance.style.transform = `rotate(${roll}deg)`));
        sub.on("irsState")
            .whenChanged()
            .handle((state) => {
            this.horizonVisibility.set(state >= 2 ? "visible" : "hidden");
            this.horizonFailVisibility.set(state < 2 ? "visible" : "hidden");
        });
    }
    render() {
        return (FSComponent.buildComponent("g", null,
            FSComponent.buildComponent("g", { visibility: this.horizonVisibility },
                FSComponent.buildComponent("clipPath", { ref: this.clipRef, id: "ah-clip" },
                    FSComponent.buildComponent("path", { d: "M156 350, h30, v-40 c 83 -115 243 -115 323 0, v40, h30, v280, h-383 Z" })),
                FSComponent.buildComponent("g", { ref: this.horizonRollGroup, class: "horizon-group" },
                    FSComponent.buildComponent("g", { ref: this.horizonPitchGroup, class: "horizon-group" },
                        FSComponent.buildComponent("rect", { x: 0, y: -800, width: 800, height: 1200, fill: "#1469BC" }),
                        FSComponent.buildComponent("rect", { x: 0, y: 400, width: 800, height: 1200, fill: "#764D17" }),
                        FSComponent.buildComponent("rect", { x: 0, y: 397.5, width: 800, height: 4, fill: "#fff", stroke: "black", "stroke-width": "1" }),
                        FSComponent.buildComponent("g", { "clip-path": "url(#ah-clip)" },
                            FSComponent.buildComponent(GraduationLines, null)))),
                FSComponent.buildComponent(BankSlipIndicator, { bus: this.props.bus }),
                FSComponent.buildComponent(FlightPathVector, { bus: this.props.bus })),
            FSComponent.buildComponent("path", { d: "M0 0, h799, v410 h-260 v-190 a-44,44 -44 0, 0 -44,-44 l-295,0 a-44,44 -44 0, 0 -44,44 v190, H0 Z" }),
            FSComponent.buildComponent("path", { d: "M156 410 v123 a-44,44 -44 0, 0 44,44 h295, a-44,44 -44 0, 0 44,-44 v-123 H800 L800, 800, H0, V410 Z" }),
            FSComponent.buildComponent(BlackOutlineLine, { d: "M190 377, h84, v30 h-11 v-20 h-73 Z", blackStroke: 5, styleColor: "fill: black;" }),
            FSComponent.buildComponent(BlackOutlineLine, { d: "M422 377, h84, v11, h-73, v20, h-11 Z", blackStroke: 5, styleColor: "fill: black;" }),
            FSComponent.buildComponent(BlackOutlineLine, { d: "M163 275, l17 10" }),
            FSComponent.buildComponent(BlackOutlineLine, { d: "M534 275, l-17 10" }),
            FSComponent.buildComponent(BlackOutlineLine, { d: "M201 236, l10 10" }),
            FSComponent.buildComponent(BlackOutlineLine, { d: "M497 236, l-10 10" }),
            FSComponent.buildComponent(BlackOutlineLine, { d: "M236 189, l15 25" }),
            FSComponent.buildComponent(BlackOutlineLine, { d: "M462 189, l-15 25" }),
            FSComponent.buildComponent(BlackOutlineLine, { d: "M278 189, l4 11" }),
            FSComponent.buildComponent(BlackOutlineLine, { d: "M420 189, l-4 11" }),
            FSComponent.buildComponent(BlackOutlineLine, { d: "M313 179, l3 13" }),
            FSComponent.buildComponent(BlackOutlineLine, { d: "M385 179, l-3 13" }),
            FSComponent.buildComponent("path", { fill: "white", stroke: "black", strokeWidth: "0.5", d: "M349 191 l-11 -15 l22 0 Z" }),
            FSComponent.buildComponent(PitchLimitIndicator, { bus: this.props.bus }),
            FSComponent.buildComponent(FlightDirector, { bus: this.props.bus }),
            FSComponent.buildComponent(MarkerBeacon, { bus: this.props.bus }),
            FSComponent.buildComponent("g", { visibility: this.horizonFailVisibility },
                FSComponent.buildComponent("rect", { x: "322", y: "299.5", width: "52", height: "27", class: "line", fill: "none", "stroke-width": "3", stroke: "#ffc400" }),
                FSComponent.buildComponent("text", { x: "348", y: "324", class: "text-3 amber middle" }, "ATT")),
            FSComponent.buildComponent(BlackOutlineLine, { d: "M343 377, h11, v11, h-11, Z", styleBlack: "fill: transparent;", styleColor: "fill: transparent;", blackStroke: 5 })));
    }
}
class BankSlipIndicator extends DisplayComponent {
    constructor() {
        super(...arguments);
        this.bankGroup = FSComponent.createRef();
        this.colour = Subject.create("white");
    }
    onAfterRender(node) {
        super.onAfterRender(node);
        const sub = this.props.bus.getSubscriber();
        sub.on("roll")
            .withPrecision(2)
            .handle((roll) => {
            this.bankGroup.instance.style.transform = `rotate(${roll}deg)`;
            this.colour.set(Math.abs(roll) > 35 ? "#ffc400" : "white");
        });
    }
    render() {
        return (FSComponent.buildComponent("g", { ref: this.bankGroup, class: "horizon-group" },
            FSComponent.buildComponent(SlipIndicator, { bus: this.props.bus, colour: this.colour }),
            FSComponent.buildComponent(BankIndicator, { bus: this.props.bus, colour: this.colour })));
    }
}
class GraduationLines extends DisplayComponent {
    indexToGraduationLineType(i) {
        if (i == 0)
            return "invisible";
        else if (i % 4 == 0)
            return "large";
        else if (!(i % 2 == 0))
            return "small";
        else
            return "half-size";
    }
    render() {
        return (FSComponent.buildComponent("g", { transform: "translate(349, 400)" }, Array.from({ length: 37 }, (_, i) => {
            const number = ((i + 1) / 4) * 10 - 2.5;
            return (FSComponent.buildComponent(FSComponent.Fragment, null,
                FSComponent.buildComponent(GraduationLine, { type: this.indexToGraduationLineType(i), y: i * 20, text: number }),
                FSComponent.buildComponent(GraduationLine, { type: this.indexToGraduationLineType(i), y: i * -20, text: number })));
        })));
    }
}
class GraduationLine extends DisplayComponent {
    getLine(length) {
        const style = `transform: translate(-${length / 2}px, ${this.props.y}px); stroke-linejoin: round;`;
        return FSComponent.buildComponent(BlackOutlineLine, { d: `M0 0,h${length}`, blackStroke: 5, styleColor: `${style} opacity: 0.9;`, styleBlack: style });
    }
    render() {
        var _a, _b;
        switch (this.props.type) {
            case "large":
                return (FSComponent.buildComponent(FSComponent.Fragment, null,
                    this.getLine(164),
                    FSComponent.buildComponent("text", { fillOpacity: 0.9, class: "text-2", x: -88, y: this.props.y + 8.5 }, (_a = this.props.text) === null || _a === void 0 ? void 0 : _a.toString()),
                    FSComponent.buildComponent("text", { fillOpacity: 0.9, class: "text-2", x: 109, y: this.props.y + 8.5 }, (_b = this.props.text) === null || _b === void 0 ? void 0 : _b.toString())));
            case "half-size":
                return this.getLine(82);
            case "small":
                return this.getLine(41);
            default:
                return FSComponent.buildComponent(FSComponent.Fragment, null);
        }
    }
}

/**
 * Copyright (C) 2022 Salty Simulations and its contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */
class VerticalSpeedIndicator extends DisplayComponent {
    constructor() {
        super(...arguments);
        this.bgVisibility = Subject.create("visible");
        this.indicatorVisibility = Subject.create("visible");
        this.indicatorLineD = Subject.create("");
        this.textRef = FSComponent.createRef();
        this.vsFailVisibility = Subject.create("hidden");
    }
    static fpmToPixels(fpm) {
        const seg1 = 0.08 * Math.min(Math.abs(fpm), 1000);
        const seg2 = 0.06 * Math.min(Math.max(Math.abs(fpm) - 1000, 0), 1000);
        const seg3 = 0.01 * Math.max(Math.abs(fpm) - 2000, 0);
        const pixels = fpm > 6000 || fpm < -6000 ? 180 : seg1 + seg2 + seg3;
        return fpm > 0 ? -pixels : pixels;
    }
    onAfterRender(node) {
        super.onAfterRender(node);
        const sub = this.props.bus.getSubscriber();
        sub.on("irsState")
            .whenChanged()
            .handle((state) => {
            this.bgVisibility.set(state >= 1 ? "visible" : "hidden");
            this.indicatorVisibility.set(state >= 2 ? "visible" : "hidden");
            this.vsFailVisibility.set(state === 0 ? "visible" : "hidden");
        });
        sub.on("verticalSpeed")
            .withPrecision(0)
            .handle((vs) => {
            this.indicatorLineD.set(`M 825 381, l -73 ${VerticalSpeedIndicator.fpmToPixels(vs)}`);
            this.textRef.instance.setAttribute("y", `${vs > 0 ? 170 - 7.33 : 630 - 7.33}`);
            this.textRef.instance.style.visibility = Math.abs(vs) > 400 ? "visible" : "hidden";
            this.textRef.instance.innerHTML = (Math.abs(vs) > 9975 ? 9999 : Math.round(Math.abs(Math.round(vs)) / 50) * 50).toString();
        });
    }
    render() {
        return (FSComponent.buildComponent("g", null,
            FSComponent.buildComponent("path", { class: "gray-bg", d: "M 723 184 h 35 l 34 97 v 200 l -34 97 h -35 v -130 l 20 -10 v -114 l -20 -10 Z", visibility: this.bgVisibility }),
            FSComponent.buildComponent("g", { visibility: this.indicatorVisibility },
                FSComponent.buildComponent(VSIScale, null),
                FSComponent.buildComponent(BlackOutlineLine, { d: this.indicatorLineD, whiteStroke: 5, blackStroke: 6 }),
                FSComponent.buildComponent(SelectedVSBug, { bus: this.props.bus }),
                FSComponent.buildComponent("text", { x: 785, class: "text-3", ref: this.textRef })),
            FSComponent.buildComponent("rect", { x: 792, y: 290, width: 9, height: 190, fill: "black" }),
            FSComponent.buildComponent("g", { visibility: this.vsFailVisibility },
                FSComponent.buildComponent("rect", { x: "751", y: "328", width: "24", height: "103", class: "line", fill: "none", "stroke-width": "3", stroke: "#ffc400" }),
                FSComponent.buildComponent("text", { x: "763", y: "353", class: "text-3 amber middle" }, "V"),
                FSComponent.buildComponent("text", { x: "763", y: "378", class: "text-3 amber middle" }, "E"),
                FSComponent.buildComponent("text", { x: "763", y: "403", class: "text-3 amber middle" }, "R"),
                FSComponent.buildComponent("text", { x: "763", y: "428", class: "text-3 amber middle" }, "T"))));
    }
}
class SelectedVSBug extends DisplayComponent {
    constructor() {
        super(...arguments);
        this.visibility = Subject.create("hidden");
        this.transform = Subject.create("");
    }
    onAfterRender(node) {
        super.onAfterRender(node);
        const sub = this.props.bus.getSubscriber();
        sub.on("vsActive")
            .whenChanged()
            .handle((active) => this.visibility.set(active ? "visible" : "hidden"));
        // mjøøød det daglige brød
        sub.on("selectedVs")
            .withPrecision(0)
            .handle((vs) => this.transform.set(`translate(0 ${VerticalSpeedIndicator.fpmToPixels(vs)})`));
    }
    render() {
        return (FSComponent.buildComponent("g", { transform: this.transform, visibility: this.visibility },
            FSComponent.buildComponent(BlackOutlineLine, { d: "M 749 383 h 14", color: "#d570ff" }),
            FSComponent.buildComponent(BlackOutlineLine, { d: "M 749 379 h 14", color: "#d570ff" })));
    }
}
class VSIScale extends DisplayComponent {
    render() {
        return (FSComponent.buildComponent("g", null,
            FSComponent.buildComponent("g", { transform: "translate(740.5 209.33)" },
                FSComponent.buildComponent("text", { x: 0, y: 0, class: "text-2", "fill-opacity": 0.9, "letter-spacing": 1.2 }, "6"),
                FSComponent.buildComponent("text", { x: 0, y: 40, class: "text-2", "fill-opacity": 0.9, "letter-spacing": 1.2 }, "2"),
                FSComponent.buildComponent("text", { x: 0, y: 100, class: "text-2", "fill-opacity": 0.9, "letter-spacing": 1.2 }, "1"),
                FSComponent.buildComponent("text", { x: 0, y: 260, class: "text-2", "fill-opacity": 0.9, "letter-spacing": 1.2 }, "1"),
                FSComponent.buildComponent("text", { x: 0, y: 320, class: "text-2", "fill-opacity": 0.9, "letter-spacing": 1.2 }, "2"),
                FSComponent.buildComponent("text", { x: 0, y: 360, class: "text-2", "fill-opacity": 0.9, "letter-spacing": 1.2 }, "6")),
            FSComponent.buildComponent(BlackOutlineLine, { d: "M 743 201, h 8", whiteStroke: 4, blackStroke: 5 }),
            FSComponent.buildComponent(BlackOutlineLine, { d: "M 743 221, h 8" }),
            FSComponent.buildComponent(BlackOutlineLine, { d: "M 743 241, h 8", whiteStroke: 4, blackStroke: 5 }),
            FSComponent.buildComponent(BlackOutlineLine, { d: "M 743 271, h 8" }),
            FSComponent.buildComponent(BlackOutlineLine, { d: "M 743 301, h 8", whiteStroke: 4, blackStroke: 5 }),
            FSComponent.buildComponent(BlackOutlineLine, { d: "M 743 341, h 8" }),
            FSComponent.buildComponent(BlackOutlineLine, { d: "M 743 381, h 18", whiteStroke: 4, blackStroke: 5 }),
            FSComponent.buildComponent(BlackOutlineLine, { d: "M 743 421, h 8" }),
            FSComponent.buildComponent(BlackOutlineLine, { d: "M 743 461, h 8", whiteStroke: 4, blackStroke: 5 }),
            FSComponent.buildComponent(BlackOutlineLine, { d: "M 743 491, h 8" }),
            FSComponent.buildComponent(BlackOutlineLine, { d: "M 743 521, h 8", whiteStroke: 4, blackStroke: 5 }),
            FSComponent.buildComponent(BlackOutlineLine, { d: "M 743 541, h 8" }),
            FSComponent.buildComponent(BlackOutlineLine, { d: "M 743 561, h 8", whiteStroke: 4, blackStroke: 5 })));
    }
}

/**
 * Salty 74S
 * Copyright (C) 2021 Salty Simulations and its contributors
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
const getHeadingDelta = (heading1, heading2) => {
    let headingDelta = heading1 - heading2;
    if (headingDelta > 180) {
        headingDelta -= 360;
    }
    else if (headingDelta < -180) {
        headingDelta += 360;
    }
    return headingDelta;
};
const getDriftAngle = (heading, track) => getHeadingDelta(heading, track) * -1;

/**
 * Copyright (C) 2022 Salty Simulations and its contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */
class HeadingBug extends DisplayComponent {
    constructor() {
        super(...arguments);
        this.heading = 0;
        this.mcpHeading = 0;
        this.selectedHeadingString = Subject.create("");
        this.bugTransform = Subject.create("");
    }
    setSelectedHeadingString(heading) {
        let hdgString = heading.toFixed(0);
        if (hdgString.length === 2) {
            hdgString = "0" + hdgString;
        }
        else if (hdgString.length === 1) {
            hdgString = "00" + hdgString;
        }
        this.selectedHeadingString.set(hdgString);
    }
    onAfterRender(node) {
        super.onAfterRender(node);
        const sub = this.props.bus.getSubscriber();
        sub.on("magneticHeading")
            .withPrecision(1)
            .handle((heading) => {
            this.heading = heading;
            this.bugTransform.set(`rotate(${Math.min(-Math.min(getHeadingDelta(this.heading, this.mcpHeading) * 1.6, 55), 55)} 349 ${900 + arcCorrection(heading, this.mcpHeading)})`);
        });
        sub.on("selectedHeading")
            .withPrecision(0)
            .handle((heading) => {
            this.mcpHeading = heading;
            this.bugTransform.set(`rotate(${Math.min(-Math.min(getHeadingDelta(this.heading, this.mcpHeading) * 1.6, 55), 55)} 349 ${900 + arcCorrection(heading, this.mcpHeading)})`);
            this.setSelectedHeadingString(heading);
        });
    }
    render() {
        return (FSComponent.buildComponent(FSComponent.Fragment, null,
            FSComponent.buildComponent("text", { x: "305", y: "777", class: "text-3 magenta" }, this.selectedHeadingString),
            FSComponent.buildComponent("text", { x: "319", y: "777", class: "text-2 magenta" }, "H"),
            FSComponent.buildComponent("g", { transform: this.bugTransform },
                FSComponent.buildComponent(BlackOutlineLine, { d: "M 335 679, h28, v-14, h-4, l-7 14, h-6, l-7 -14, h-4, Z", blackStroke: 5, color: "#d570ff" }))));
    }
}

/**
 * Copyright (C) 2022 Salty Simulations and its contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */
class TrackLine extends DisplayComponent {
    constructor() {
        super(...arguments);
        this.heading = 0;
        this.track = 0;
        this.trackLineTransform = Subject.create("");
    }
    onAfterRender(node) {
        super.onAfterRender(node);
        const sub = this.props.bus.getSubscriber();
        sub.on("magneticHeading")
            .withPrecision(1)
            .handle((heading) => {
            this.heading = heading;
            this.trackLineTransform.set(`rotate(${getHeadingDelta(this.heading, this.heading - getDriftAngle(this.heading, this.track)) * 1.6} 349 ${900 + arcCorrection(this.heading, this.heading - getDriftAngle(this.heading, this.track))})`);
        });
        sub.on("magneticTrack")
            .withPrecision(1)
            .handle((track) => {
            this.track = track;
            this.trackLineTransform.set(`rotate(${getHeadingDelta(this.heading, this.heading - getDriftAngle(this.heading, this.track)) * 1.6} 349 ${900 + arcCorrection(this.heading, this.heading - getDriftAngle(this.heading, this.track))})`);
        });
    }
    render() {
        return (FSComponent.buildComponent("g", { transform: this.trackLineTransform },
            FSComponent.buildComponent("path", { class: "line", stroke: "black", "stroke-width": "5", d: "M349 680, v150" }),
            FSComponent.buildComponent("path", { class: "line", stroke: "black", "stroke-width": "5", d: "M343 751, h12" }),
            FSComponent.buildComponent("path", { class: "line", stroke: "white", "stroke-width": "3", d: "M349 680, v150" }),
            FSComponent.buildComponent("path", { class: "line", stroke: "white", "stroke-width": "3", d: "M343 751, h12" })));
    }
}

/**
 * Copyright (C) 2022 Salty Simulations and its contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */
const arcCorrection = (heading, indicatorHeading) => Math.min(Math.abs(getHeadingDelta(heading, indicatorHeading) * 100), 30);
class HeadingDisplay extends DisplayComponent {
    constructor() {
        super(...arguments);
        this.visibilityAligning = Subject.create("visible");
        this.visibilityAligned = Subject.create("visible");
        this.hdgFailVisibility = Subject.create("hidden");
    }
    onAfterRender(node) {
        super.onAfterRender(node);
        const sub = this.props.bus.getSubscriber();
        sub.on("irsState")
            .whenChanged()
            .handle((state) => {
            this.visibilityAligning.set(state >= 1 ? "visible" : "hidden");
            this.visibilityAligned.set(state === 2 ? "visible" : "hidden");
            this.hdgFailVisibility.set(state === 0 ? "visible" : "hidden");
        });
    }
    render() {
        return (FSComponent.buildComponent("g", null,
            FSComponent.buildComponent("g", { visibility: this.visibilityAligning },
                FSComponent.buildComponent("path", { class: "gray-bg", d: "M142 785, h412, c -103 -140, -306 -140, -412 0 Z" }),
                FSComponent.buildComponent(BlackOutlineLine, { d: "M349 677 l-11 -20 l22 0 Z", blackStroke: 6, whiteStroke: 4 }),
                FSComponent.buildComponent(HeadingLines, { bus: this.props.bus }),
                FSComponent.buildComponent("text", { x: "435", y: "777", class: "text-2 green" }, "MAG")),
            FSComponent.buildComponent("g", { visibility: this.visibilityAligned },
                FSComponent.buildComponent(HeadingBug, { bus: this.props.bus }),
                FSComponent.buildComponent(TrackLine, { bus: this.props.bus })),
            FSComponent.buildComponent("rect", { x: "200", y: "785", width: "300", height: "5", fill: "black" }),
            FSComponent.buildComponent("rect", { x: "110", y: "789", width: "480", height: "15", fill: "black" }),
            FSComponent.buildComponent("g", { visibility: this.hdgFailVisibility },
                FSComponent.buildComponent("rect", { x: "322", y: "749.5", width: "52", height: "27", class: "line", fill: "none", "stroke-width": "3", stroke: "#ffc400" }),
                FSComponent.buildComponent("text", { x: "348", y: "774", class: "text-3 amber middle" }, "HDG"))));
    }
}
class HeadingLineElement extends DisplayComponent {
    constructor() {
        super(...arguments);
        this.transform = Subject.create("");
        this.visibility = Subject.create("visible");
    }
    onAfterRender(node) {
        super.onAfterRender(node);
        const sub = this.props.bus.getSubscriber();
        sub.on("magneticHeading")
            .withPrecision(1)
            .handle((heading) => {
            this.transform.set(`rotate(${-getHeadingDelta(heading, this.props.rotation) * 1.6} 349 ${900 + arcCorrection(heading * 10, this.props.rotation)})`);
        });
        sub.on("irsState")
            .whenChanged()
            .handle((state) => this.visibility.set(state === 2 ? "visible" : "hidden"));
    }
    render() {
        return (FSComponent.buildComponent("g", { transform: this.transform },
            FSComponent.buildComponent(BlackOutlineLine, { d: `M349 680.5, v${this.props.text ? 11 : 5.5}` }),
            this.props.text && (FSComponent.buildComponent("text", { x: "349", y: this.props.rotation % 3 === 0 ? 718 : 712, class: `${this.props.rotation % 3 === 0 ? "text-3" : "text-2"} middle`, "fill-opacity": `${this.props.rotation % 3 === 0 ? "1" : "0.9"}`, visibility: this.visibility }, this.props.rotation == 360 ? "0" : (this.props.rotation / 10).toString()))));
    }
}
class HeadingLines extends DisplayComponent {
    render() {
        return (FSComponent.buildComponent(FSComponent.Fragment, null, Array.from({ length: 36 }, (_, i) => {
            const rotation = (i + 1) * 10;
            return (FSComponent.buildComponent(FSComponent.Fragment, null,
                FSComponent.buildComponent(HeadingLineElement, { bus: this.props.bus, rotation: rotation, text: true }),
                FSComponent.buildComponent(HeadingLineElement, { bus: this.props.bus, rotation: rotation - 5 })));
        })));
    }
}

/**
 * Copyright (C) 2022 Salty Simulations and its contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */
class AirspeedScroller extends DisplayComponent {
    constructor() {
        super(...arguments);
        this.hundredsTransform = Subject.create("");
        this.tensTransform = Subject.create(`translate(0 ${this.getTensScrollerY(30)})`);
        this.digitTransform = Subject.create(`translate(0 ${this.getDigitScrollerY(30)})`);
    }
    getHundredsScrollerY(airspeed) {
        let scroll = Math.floor(airspeed / 100) * 49;
        if (Math.floor(airspeed).toString().slice(-1) === "9" && Math.floor(airspeed).toString().slice(-2, -1) === "9") {
            let speedOver99Int = Math.round(airspeed / 100) * 100 - 1 - airspeed;
            scroll = scroll + -speedOver99Int * 49;
        }
        return scroll;
    }
    getTensScrollerY(airspeed) {
        const value = Math.max(airspeed, 30) % 100;
        let scroll = Math.floor(value / 10) * 49;
        if (Math.floor(value).toString().slice(-1) === "9") {
            const speedOver9Int = Math.round(value / 10) * 10 - 1 - value;
            scroll = scroll + -speedOver9Int * 49;
        }
        return scroll;
    }
    getDigitScrollerY(airspeed) {
        return ((Math.max(airspeed, 30) % 100) % 10) * 33;
    }
    onAfterRender(node) {
        super.onAfterRender(node);
        const sub = this.props.bus.getSubscriber();
        sub.on("airspeed")
            .whenChangedBy(0.0625)
            .handle((airspeed) => {
            this.hundredsTransform.set(`translate(0 ${this.getHundredsScrollerY(airspeed)})`);
            this.tensTransform.set(`translate(0 ${this.getTensScrollerY(airspeed)})`);
            this.digitTransform.set(`translate(0 ${this.getDigitScrollerY(airspeed)})`);
        });
    }
    render() {
        return (FSComponent.buildComponent("g", null,
            FSComponent.buildComponent(ScrollerBox, { bus: this.props.bus }),
            FSComponent.buildComponent("clipPath", { id: "asi-clip" },
                FSComponent.buildComponent("path", { d: "M 14 348, h64, v65, h-64 Z" })),
            FSComponent.buildComponent("g", { class: "text-4", "clip-path": "url(#asi-clip)" },
                FSComponent.buildComponent("g", { transform: this.hundredsTransform }, Array.from({ length: 5 }, (_, i) => (FSComponent.buildComponent("text", { x: "35", y: 200 + 49 * i }, (i == 4 ? "" : 4 - i).toString())))),
                FSComponent.buildComponent("g", { transform: this.tensTransform },
                    Array.from({ length: 10 }, (_, i) => (FSComponent.buildComponent("text", { x: "56", y: -45 + 49 * i }, (9 - i).toString()))),
                    FSComponent.buildComponent("text", { x: "57", y: "-94" }, "0")),
                FSComponent.buildComponent("g", { transform: this.digitTransform },
                    Array.from({ length: 10 }, (_, i) => (FSComponent.buildComponent("text", { x: "77", y: 99 + 33 * i }, (9 - i).toString()))),
                    FSComponent.buildComponent("text", { x: "77", y: "33" }, "1"),
                    FSComponent.buildComponent("text", { x: "77", y: "66" }, "0"),
                    FSComponent.buildComponent("text", { x: "77", y: "99" }, "9"),
                    FSComponent.buildComponent("text", { x: "77", y: "429" }, "9")))));
    }
}
class ScrollerBox extends DisplayComponent {
    constructor() {
        super(...arguments);
        this.airspeed = 0;
        this.maneuveringSpeed = 0;
        this.radioHeight = 0;
        this.strokeWidth = Subject.create(3);
        this.colour = Subject.create("white");
    }
    handleLowAirspeedIndication() {
        this.strokeWidth.set(Math.max(this.airspeed, 30) < this.maneuveringSpeed && this.radioHeight > 25 ? 9 : 3);
        this.colour.set(Math.max(this.airspeed, 30) < this.maneuveringSpeed && this.radioHeight > 25 ? "#ffc400" : "white");
    }
    onAfterRender(node) {
        super.onAfterRender(node);
        const sub = this.props.bus.getSubscriber();
        sub.on("airspeed")
            .whenChangedBy(0.0625)
            .handle((airspeed) => {
            this.airspeed = airspeed;
            this.handleLowAirspeedIndication();
        });
        sub.on("maneuveringSpeed")
            .whenChangedBy(0.25)
            .handle((manSpeed) => {
            this.maneuveringSpeed = manSpeed;
            this.handleLowAirspeedIndication();
        });
        sub.on("altAboveGround")
            .withPrecision(1)
            .handle((height) => {
            this.radioHeight = height;
            this.handleLowAirspeedIndication();
        });
    }
    render() {
        return (FSComponent.buildComponent(BlackOutlineLine, { d: "M 10 342 h 72 v 28 l 14 11 l -14 11 v 28 h -72 Z", blackStroke: 5, whiteStroke: this.strokeWidth, color: this.colour }));
    }
}

/**
 * Copyright (C) 2022 Salty Simulations and its contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */
class VSpeedBugs extends DisplayComponent {
    constructor() {
        super(...arguments);
        this.radioHeight = 0;
        this.flightPhase = 0;
        this.airspeed = 0;
        this.v1 = 0;
        this.vR = 0;
        this.v2 = 0;
        this.v1Visibility = Subject.create("hidden");
        this.vRVisibility = Subject.create("hidden");
        this.v2Visibility = Subject.create("hidden");
        this.v1D = Subject.create("");
        this.vRD = Subject.create("");
        this.v2D = Subject.create("");
        this.v1Y = Subject.create(0);
        this.vRY = Subject.create(0);
        this.v2Y = Subject.create(0);
        this.vRBugText = Subject.create("");
    }
    handleVSpeedVisibility() {
        this.v1Visibility.set(this.radioHeight < 25 && this.flightPhase <= 2 && this.v1 != 0 ? "visible" : "hidden");
        this.vRVisibility.set(this.radioHeight < 25 && this.flightPhase <= 2 && this.vR != 0 ? "visible" : "hidden");
        this.v2Visibility.set(this.flightPhase <= 2 && this.v2 != 0 ? "visible" : "hidden");
    }
    onAfterRender(node) {
        super.onAfterRender(node);
        const sub = this.props.bus.getSubscriber();
        sub.on("altAboveGround")
            .withPrecision(1)
            .handle((height) => {
            this.radioHeight = height;
            this.handleVSpeedVisibility();
        });
        sub.on("flightPhase")
            .whenChanged()
            .handle((phase) => {
            this.flightPhase = phase;
            this.handleVSpeedVisibility();
        });
        sub.on("airspeed")
            .whenChangedBy(0.0625)
            .handle((airspeed) => {
            this.airspeed = airspeed;
            this.v1Y.set(Math.max(529 + this.v1 * -4.6, 520 + (Math.max(this.airspeed, 30) + 54) * -4.6));
        });
        sub.on("v1")
            .whenChanged()
            .handle((v1) => {
            this.v1 = v1;
            this.v1D.set(`M 45 ${520 + v1 * -4.6}, h20`);
            this.v1Y.set(Math.max(529 + v1 * -4.6, 520 + (Math.max(this.airspeed, 30) + 54) * -4.6));
            this.vRBugText.set(this.vR - this.v1 < 4 ? "R" : "VR");
            this.handleVSpeedVisibility();
        });
        sub.on("vR")
            .whenChanged()
            .handle((vR) => {
            this.vR = vR;
            this.vRD.set(`M 55 ${520 + vR * -4.6}, h10`);
            this.vRY.set(529 + vR * -4.6);
            this.vRBugText.set(this.vR - this.v1 < 4 ? "R" : "VR");
            this.handleVSpeedVisibility();
        });
        sub.on("v2")
            .whenChanged()
            .handle((v2) => {
            this.v2 = v2;
            this.v2D.set(`M 55 ${520 + v2 * -4.6}, h10`);
            this.v2Y.set(529 + v2 * -4.6);
            this.handleVSpeedVisibility();
        });
    }
    render() {
        return (FSComponent.buildComponent(FSComponent.Fragment, null,
            FSComponent.buildComponent("g", { visibility: this.v1Visibility },
                FSComponent.buildComponent(BlackOutlineLine, { d: this.v1D, blackStroke: 6, whiteStroke: 5, color: "lime" }),
                FSComponent.buildComponent("text", { x: "93", y: this.v1Y, class: "text-2 green" }, "V1")),
            FSComponent.buildComponent("g", { visibility: this.vRVisibility },
                FSComponent.buildComponent(BlackOutlineLine, { d: this.vRD, blackStroke: 6, whiteStroke: 5, color: "lime" }),
                FSComponent.buildComponent("text", { x: "105", y: this.vRY, class: "text-2 green" }, this.vRBugText)),
            FSComponent.buildComponent("g", { visibility: this.v2Visibility },
                FSComponent.buildComponent(BlackOutlineLine, { d: this.v2D, blackStroke: 6, whiteStroke: 5, color: "lime" }),
                FSComponent.buildComponent("text", { x: "93", y: this.v2Y, class: "text-2 green" }, "V2"))));
    }
}

/**
 * Copyright (C) 2022 Salty Simulations and its contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */
class FlapSpeedBugs extends DisplayComponent {
    constructor() {
        super(...arguments);
        this.radioHeight = 0;
        this.flightPhase = 0;
        this.selectedFlaps = 0;
        this.vRef20 = 0;
        this.vRef25 = 0;
        this.vRef30 = 0;
        this.landingFlaps = 0;
        this.visibility = Subject.create("hidden");
        this.currentFlapSpeedBugD = Subject.create("");
        this.currentFlapSpeedBugY = Subject.create(0);
        this.currentFlapSpeedBugText = Subject.create("");
        this.nextFlapSpeedBugD = Subject.create("");
        this.nextFlapSpeedBugY = Subject.create(0);
        this.nextFlapSpeedBugText = Subject.create("");
        this.flapMarkerText = ["UP", "1\xa0", "5\xa0", "10", "20", "25"];
        this.flapMarkerSpeed = [80, 60, 40, 20, 10];
    }
    currentFlapMarkerSpeed(flapsHandle, vRef30, vRef25, vRef20, landingFlaps) {
        if (flapsHandle === 4 && landingFlaps !== 20)
            return vRef20;
        if (flapsHandle === 5 && landingFlaps !== 25)
            return vRef25;
        return flapsHandle > 5 || (flapsHandle === 5 && landingFlaps === 25) ? -1 : vRef30 + this.flapMarkerSpeed[flapsHandle];
    }
    nextFlapMarkerSpeed(flapsHandle, vRef30, landingFlaps) {
        if (flapsHandle === 5 && landingFlaps !== 25)
            return vRef30 + 10;
        return flapsHandle > 5 || flapsHandle < 1 || (flapsHandle === 5 && landingFlaps === 25) ? -1 : vRef30 + this.flapMarkerSpeed[flapsHandle - 1];
    }
    handleFlapsBugs() {
        this.currentFlapSpeedBugD.set(`M 55 ${520 + this.currentFlapMarkerSpeed(this.selectedFlaps, this.vRef30, this.vRef25, this.vRef20, this.landingFlaps) * -4.6}, h10`);
        this.currentFlapSpeedBugY.set(529 + this.currentFlapMarkerSpeed(this.selectedFlaps, this.vRef30, this.vRef25, this.vRef20, this.landingFlaps) * -4.6);
        this.nextFlapSpeedBugD.set(`M 55 ${520 + this.nextFlapMarkerSpeed(this.selectedFlaps, this.vRef30, this.landingFlaps) * -4.6}, h10`);
        this.nextFlapSpeedBugY.set(529 + this.nextFlapMarkerSpeed(this.selectedFlaps, this.vRef30, this.landingFlaps) * -4.6);
    }
    onAfterRender(node) {
        super.onAfterRender(node);
        const sub = this.props.bus.getSubscriber();
        sub.on("altAboveGround")
            .withPrecision(1)
            .handle((height) => {
            this.radioHeight = height;
            this.visibility.set(this.flightPhase >= 2 && this.radioHeight > 25 && this.radioHeight < 20000 ? "visible" : "hidden");
        });
        sub.on("onGround")
            .whenChanged()
            .handle((_) => {
            this.currentFlapSpeedBugText.set(this.selectedFlaps <= 5 ? this.flapMarkerText[this.selectedFlaps] : "");
            this.nextFlapSpeedBugText.set(this.selectedFlaps < 1 || (this.selectedFlaps === 5 && this.landingFlaps === 25) || this.selectedFlaps > 5
                ? ""
                : this.flapMarkerText[this.selectedFlaps - 1]);
        });
        sub.on("flightPhase")
            .whenChanged()
            .handle((phase) => {
            this.flightPhase = phase;
            this.visibility.set(this.flightPhase >= 2 && this.radioHeight > 25 ? "visible" : "hidden");
        });
        sub.on("flapsHandle")
            .whenChanged()
            .handle((flaps) => {
            this.selectedFlaps = flaps;
            this.handleFlapsBugs();
            this.currentFlapSpeedBugText.set(flaps <= 5 ? this.flapMarkerText[flaps] : "");
            this.nextFlapSpeedBugText.set(flaps < 1 || (flaps === 5 && this.landingFlaps === 25) || flaps > 5 ? "" : this.flapMarkerText[flaps - 1]);
        });
        sub.on("vRef20")
            .whenChanged()
            .handle((vRef20) => {
            this.vRef20 = vRef20;
            this.handleFlapsBugs();
        });
        sub.on("vRef25")
            .whenChanged()
            .handle((vRef25) => {
            this.vRef25 = vRef25;
            this.handleFlapsBugs();
        });
        sub.on("vRef30")
            .whenChanged()
            .handle((vRef30) => {
            this.vRef30 = vRef30;
            this.handleFlapsBugs();
        });
        sub.on("landingFlaps")
            .whenChanged()
            .handle((flaps) => {
            this.landingFlaps = flaps;
            this.handleFlapsBugs();
            this.nextFlapSpeedBugText.set(flaps < 1 || (flaps === 5 && this.landingFlaps === 25) || flaps > 5 ? "" : this.flapMarkerText[flaps - 1]);
        });
    }
    render() {
        return (FSComponent.buildComponent(FSComponent.Fragment, null,
            FSComponent.buildComponent("g", { visibility: this.visibility },
                FSComponent.buildComponent(BlackOutlineLine, { d: this.currentFlapSpeedBugD, blackStroke: 6, whiteStroke: 5, color: "lime" }),
                FSComponent.buildComponent("text", { x: "93", y: this.currentFlapSpeedBugY, class: "text-2 green" }, this.currentFlapSpeedBugText)),
            FSComponent.buildComponent("g", { visibility: this.visibility },
                FSComponent.buildComponent(BlackOutlineLine, { d: this.nextFlapSpeedBugD, blackStroke: 6, whiteStroke: 5, color: "lime" }),
                FSComponent.buildComponent("text", { x: "93", y: this.nextFlapSpeedBugY, class: "text-2 green" }, this.nextFlapSpeedBugText))));
    }
}

/**
 * Copyright (C) 2022 Salty Simulations and its contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */
class RefSpeedBugs extends DisplayComponent {
    constructor() {
        super(...arguments);
        this.airspeed = 0;
        this.vRef = 0;
        this.bugVisibility = Subject.create("hidden");
        this.bugLineVisibility = Subject.create("hidden");
        this.bugY = Subject.create(0);
        this.bugLineD = Subject.create("");
    }
    handleRefBug() {
        this.bugVisibility.set(this.vRef != 0 && Math.max(this.airspeed, 30) - this.vRef < 52.5 ? "visible" : "hidden");
        this.bugY.set(Math.min(529 + this.vRef * -4.6, 529 + (Math.max(this.airspeed, 30) - 52.5) * -4.6));
    }
    onAfterRender(node) {
        super.onAfterRender(node);
        const sub = this.props.bus.getSubscriber();
        sub.on("airspeed")
            .whenChangedBy(0.0625)
            .handle((airspeed) => {
            this.airspeed = airspeed;
            this.handleRefBug();
        });
        sub.on("vRef")
            .whenChanged()
            .handle((vRef) => {
            this.vRef = vRef;
            this.handleRefBug();
            this.bugLineVisibility.set(this.vRef != 0 ? "visible" : "hidden");
            this.bugLineD.set(`M 45 ${520 + this.vRef * -4.6}, h20`);
        });
    }
    render() {
        return (FSComponent.buildComponent(FSComponent.Fragment, null,
            FSComponent.buildComponent("g", { visibility: this.bugLineVisibility },
                FSComponent.buildComponent("text", { x: "71", y: this.bugY, class: "text-2 green start" }, "REF")),
            FSComponent.buildComponent("g", { visibility: this.bugLineVisibility },
                FSComponent.buildComponent(BlackOutlineLine, { d: this.bugLineD, blackStroke: 6, whiteStroke: 5, color: "lime" }))));
    }
}

/**
 * Copyright (C) 2022 Salty Simulations and its contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */
class SpeedBugs extends DisplayComponent {
    render() {
        return (FSComponent.buildComponent(FSComponent.Fragment, null,
            FSComponent.buildComponent(VSpeedBugs, { bus: this.props.bus }),
            FSComponent.buildComponent(FlapSpeedBugs, { bus: this.props.bus }),
            FSComponent.buildComponent(RefSpeedBugs, { bus: this.props.bus }),
            FSComponent.buildComponent(SelectedSpeedBug, { bus: this.props.bus })));
    }
}
class SelectedSpeedBug extends DisplayComponent {
    constructor() {
        super(...arguments);
        this.airspeed = 0;
        this.selectedSpeed = 0;
        this.d = Subject.create("");
    }
    handleSpeedBug() {
        this.d.set(`M 49 ${Math.max(520 + (Math.max(this.airspeed, 30) + 61.5) * -4.6, Math.min(520 + this.selectedSpeed * -4.6, 520 + (Math.max(this.airspeed, 30) - 60.5) * -4.6))}, l 15 11.5, h32, v-23, h-32, Z`);
    }
    onAfterRender(node) {
        super.onAfterRender(node);
        const sub = this.props.bus.getSubscriber();
        sub.on("airspeed")
            .whenChangedBy(0.0625)
            .handle((speed) => {
            this.airspeed = speed;
            this.handleSpeedBug();
        });
        sub.on("selectedSpeed")
            .whenChanged()
            .handle((speed) => {
            this.selectedSpeed = speed;
            this.handleSpeedBug();
        });
    }
    render() {
        return FSComponent.buildComponent(BlackOutlineLine, { d: this.d, color: "#d570ff", blackStroke: 5, styleBlack: "fill: none;", styleColor: "fill: none;" });
    }
}

/**
 * Copyright (C) 2022 Salty Simulations and its contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */
class ValuePreviews extends DisplayComponent {
    constructor() {
        super(...arguments);
        this.airspeed = 0;
        this.vRef = 0;
        this.v1 = 0;
        this.landingFlaps = 0;
        this.flightPhase = 0;
        this.refTextVisibility = Subject.create("hidden");
        this.refValuePreviewVisibility = Subject.create("hidden");
        this.refValuePreview = Subject.create("");
        this.v1PreviewVisibility = Subject.create("hidden");
        this.v1PreviewText = Subject.create(0);
    }
    refValueText(vRef, landingFlaps) {
        if (vRef) {
            switch (landingFlaps) {
                case 20:
                    return `20/${vRef.toString()}`;
                case 25:
                    return `25/${vRef.toString()}`;
                case 30:
                    return `30/${vRef.toString()}`;
            }
        }
        return "";
    }
    onAfterRender(node) {
        super.onAfterRender(node);
        const sub = this.props.bus.getSubscriber();
        sub.on("flightPhase")
            .whenChanged()
            .handle((phase) => {
            this.flightPhase = phase;
            this.v1PreviewVisibility.set(this.v1 - Math.max(this.airspeed, 30) > 55 && this.flightPhase <= 2 ? "visible" : "hidden");
        });
        sub.on("airspeed")
            .whenChangedBy(0.0625)
            .handle((airspeed) => {
            this.airspeed = airspeed;
            this.v1PreviewVisibility.set(this.v1 - Math.max(this.airspeed, 30) > 55 && this.flightPhase <= 2 ? "visible" : "hidden");
            this.refValuePreviewVisibility.set(Math.max(this.airspeed, 30) - this.vRef > 52.5 && this.vRef != 0 ? "visible" : "hidden");
        });
        sub.on("v1")
            .whenChanged()
            .handle((v1) => {
            this.v1 = v1;
            this.v1PreviewText.set(v1);
            this.v1PreviewVisibility.set(this.v1 - Math.max(this.airspeed, 30) > 55 && this.flightPhase <= 2 ? "visible" : "hidden");
        });
        sub.on("vRef")
            .whenChanged()
            .handle((vRef) => {
            this.vRef = vRef;
            this.refTextVisibility.set(this.vRef != 0 ? "visible" : "hidden");
            this.refValuePreview.set(this.refValueText(this.vRef, this.landingFlaps));
            this.refValuePreviewVisibility.set(Math.max(this.airspeed, 30) - this.vRef > 52.5 && this.vRef != 0 ? "visible" : "hidden");
        });
        sub.on("landingFlaps")
            .whenChanged()
            .handle((flaps) => {
            this.landingFlaps = flaps;
            this.refValuePreview.set(this.refValueText(this.vRef, this.landingFlaps));
        });
    }
    render() {
        return (FSComponent.buildComponent(FSComponent.Fragment, null,
            FSComponent.buildComponent("text", { visibility: this.v1PreviewVisibility, x: "155", y: 155, class: "text-2 green" }, this.v1PreviewText),
            FSComponent.buildComponent("text", { x: "121", y: 632, class: "text-2 green start", visibility: this.refValuePreviewVisibility }, "REF"),
            FSComponent.buildComponent("text", { x: "121", y: 654, class: "text-2 green start", visibility: this.refTextVisibility }, this.refValuePreview)));
    }
}

/**
 * Copyright (C) 2022 Salty Simulations and its contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */
class SpeedBands extends DisplayComponent {
    constructor() {
        super(...arguments);
        this.airspeed = 0;
        this.maneuveringSpeed = 0;
        this.maxSpeed = 0;
        this.minSpeed = 0;
        this.onGround = false;
        this.takeoffFlaps = 0;
        this.actualFlapAngle = 0;
        this.maneuveringSpeedBandVisibility = Subject.create("hidden");
        this.minMaxSpeedBandVisibility = Subject.create("hidden");
        this.maneuveringSpeedBandTransform = Subject.create("");
        this.minimumSpeedBandTransform = Subject.create("");
        this.maximumSpeedBandTransform = Subject.create("");
    }
    onAfterRender(node) {
        super.onAfterRender(node);
        const sub = this.props.bus.getSubscriber();
        sub.on("onGround")
            .whenChanged()
            .handle((onGround) => {
            this.onGround = onGround;
            this.minMaxSpeedBandVisibility.set(!onGround ? "visible" : "hidden");
            this.maneuveringSpeedBandVisibility.set(!this.onGround && this.takeoffFlaps !== this.actualFlapAngle ? "visible" : "hidden");
        });
        sub.on("takeoffFlaps")
            .whenChanged()
            .handle((flaps) => {
            this.takeoffFlaps = flaps;
            this.maneuveringSpeedBandVisibility.set(!this.onGround && this.takeoffFlaps !== this.actualFlapAngle ? "visible" : "hidden");
        });
        sub.on("actualFlapAngle")
            .whenChanged()
            .handle((angle) => {
            this.actualFlapAngle = angle;
            this.maneuveringSpeedBandVisibility.set(!this.onGround && this.takeoffFlaps !== this.actualFlapAngle ? "visible" : "hidden");
        });
        sub.on("airspeed")
            .whenChangedBy(0.0625)
            .handle((speed) => {
            this.airspeed = speed;
            this.maneuveringSpeedBandTransform.set(`translate(50 ${(Math.max(this.airspeed, 30) - this.maneuveringSpeed) * 4.6})`);
            this.maximumSpeedBandTransform.set(`translate(50 ${(Math.max(this.airspeed, 30) - this.maxSpeed) * 4.6})`);
            this.minimumSpeedBandTransform.set(`translate(50 ${(Math.max(this.airspeed, 30) - this.minSpeed) * 4.6})`);
        });
        sub.on("maneuveringSpeed")
            .whenChangedBy(0.25)
            .handle((speed) => {
            this.maneuveringSpeed = speed;
            this.maneuveringSpeedBandTransform.set(`translate(50 ${(Math.max(this.airspeed, 30) - this.maneuveringSpeed) * 4.6})`);
        });
        sub.on("maxSpeed")
            .withPrecision(0)
            .handle((speed) => {
            this.maxSpeed = speed;
            this.maximumSpeedBandTransform.set(`translate(50 ${(Math.max(this.airspeed, 30) - this.maxSpeed) * 4.6})`);
        });
        sub.on("minSpeed")
            .withPrecision(0)
            .handle((speed) => {
            this.minSpeed = speed;
            this.minimumSpeedBandTransform.set(`translate(50 ${(Math.max(this.airspeed, 30) - this.minSpeed) * 4.6})`);
        });
    }
    render() {
        return (FSComponent.buildComponent(FSComponent.Fragment, null,
            FSComponent.buildComponent("g", { visibility: this.maneuveringSpeedBandVisibility, transform: this.maneuveringSpeedBandTransform },
                FSComponent.buildComponent(BlackOutlineLine, { d: "M 62 382, h7, v 1800", color: "#ffc400", blackStroke: 5 })),
            FSComponent.buildComponent("g", { visibility: this.minMaxSpeedBandVisibility, transform: this.maximumSpeedBandTransform },
                FSComponent.buildComponent("path", { class: "red-band", d: "M 67 -1826, v 2209" })),
            FSComponent.buildComponent("g", { visibility: this.minMaxSpeedBandVisibility, transform: this.minimumSpeedBandTransform },
                FSComponent.buildComponent("path", { d: "M 63 382, h9, v 1800, h-9, Z", fill: "black" }),
                FSComponent.buildComponent("path", { class: "red-band", d: "M 67 382, v 1800", fill: "none" }))));
    }
}

/**
 * Copyright (C) 2022 Salty Simulations and its contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */
//TODO: this should also include some component based on airspeed change vs delta time, not just acceleration
class SpeedTrendVector extends DisplayComponent {
    constructor() {
        super(...arguments);
        this.acceleration = 0;
        this.airspeed = 0;
        this.visibility = Subject.create("hidden");
        this.d = Subject.create("");
    }
    getTrendVector(acceleration, airspeed) {
        if (airspeed < 30)
            return 0;
        return acceleration > 0 ? Math.min(acceleration * 5.925, 60.5) : Math.max(acceleration * 5.925, -60.5);
    }
    handleTrendVector() {
        this.visibility.set(Math.abs(this.getTrendVector(this.acceleration, this.airspeed)) < 4.5 ? "hidden" : "visible");
        this.d.set(`M 96 381, v${this.getTrendVector(this.acceleration, this.airspeed) * -4.6 - (this.acceleration > 0 ? -12 : 12)}, m-6 0, h12, m0 0, l-6 ${this.acceleration > 0 ? "-" : ""}12, m0 0, l-6 ${this.acceleration < 0 ? "-" : ""}12`);
    }
    onAfterRender(node) {
        super.onAfterRender(node);
        const sub = this.props.bus.getSubscriber();
        sub.on("acceleration")
            .withPrecision(1)
            .handle((acceleration) => {
            this.acceleration = acceleration / 60;
            this.handleTrendVector();
        });
        sub.on("airspeed")
            .whenChangedBy(0.0625)
            .handle((airspeed) => {
            this.airspeed = airspeed;
            this.handleTrendVector();
        });
    }
    render() {
        return (FSComponent.buildComponent("g", { visibility: this.visibility },
            FSComponent.buildComponent(BlackOutlineLine, { d: this.d, color: "lime", blackStroke: 5, styleBlack: "fill: none;", styleColor: "fill: none;" })));
    }
}

/**
 * Copyright (C) 2022 Salty Simulations and its contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */
class SpeedTape extends DisplayComponent {
    constructor() {
        super(...arguments);
        this.transform = Subject.create("translate(50 0)");
        this.noVSpeed = Subject.create("hidden");
    }
    airspeedY(airspeed) {
        return Math.max(airspeed - 30, 0) * 4.6;
    }
    onAfterRender(node) {
        super.onAfterRender(node);
        const sub = this.props.bus.getSubscriber();
        sub.on("airspeed")
            .whenChangedBy(0.0625)
            .handle((speed) => {
            this.transform.set(`translate(50 ${this.airspeedY(Math.max(speed, 30))})`);
        });
        sub.on("v1")
            .whenChanged()
            .handle((v1) => this.noVSpeed.set(v1 == 0 ? "visible" : "hidden"));
    }
    render() {
        return (FSComponent.buildComponent("g", null,
            FSComponent.buildComponent("g", { visibility: this.noVSpeed },
                FSComponent.buildComponent("text", { x: "135", y: "238", class: "text-3 amber middle" }, "NO"),
                FSComponent.buildComponent("text", { x: "135", y: "270", class: "text-3 amber middle" }, "V"),
                FSComponent.buildComponent("text", { x: "135", y: "302", class: "text-3 amber middle" }, "S"),
                FSComponent.buildComponent("text", { x: "135", y: "327", class: "text-3 amber middle" }, "P"),
                FSComponent.buildComponent("text", { x: "135", y: "352", class: "text-3 amber middle" }, "D")),
            FSComponent.buildComponent("path", { class: "gray-bg", d: "M13 100, h100 v560 h -100 Z" }),
            FSComponent.buildComponent("clipPath", { id: "speedtape-clip" },
                FSComponent.buildComponent("path", { d: "M13 100, h200 v560 h -200 Z" })),
            FSComponent.buildComponent("g", { "clip-path": "url(#speedtape-clip)" },
                FSComponent.buildComponent("g", { transform: this.transform },
                    Array.from({ length: 40 }, (_, i) => (FSComponent.buildComponent(BlackOutlineLine, { d: `M47 ${i * -46 + 382}, h15` }))),
                    Array.from({ length: 21 }, (_, i) => (FSComponent.buildComponent("text", { x: "32", y: i * -92 + 428 + 11, class: "text-3 white", "fill-opacity": 0.9, "letter-spacing": -0.5 }, i === 0 ? "" : ((i + 1) * 20).toFixed(0)))),
                    FSComponent.buildComponent(SpeedBugs, { bus: this.props.bus })),
                FSComponent.buildComponent(SpeedBands, { bus: this.props.bus })),
            FSComponent.buildComponent(ValuePreviews, { bus: this.props.bus }),
            FSComponent.buildComponent("path", { class: "gray-bg", d: "M 14 332, h 71, v 100, h -71, Z" }),
            FSComponent.buildComponent(CommandSpeed, { bus: this.props.bus }),
            FSComponent.buildComponent(MachGS, { bus: this.props.bus }),
            FSComponent.buildComponent(SpeedTrendVector, { bus: this.props.bus })));
    }
}
class CommandSpeed extends DisplayComponent {
    constructor() {
        super(...arguments);
        this.selectedSpeed = 0;
        this.machSpeed = 0;
        this.isInMach = false;
        this.textContent = Subject.create("");
    }
    handleCommandSpeed() {
        this.textContent.set(this.isInMach ? this.machSpeed.toFixed(3).replace("0", "") : this.selectedSpeed.toFixed(0));
    }
    onAfterRender(node) {
        super.onAfterRender(node);
        const sub = this.props.bus.getSubscriber();
        sub.on("selectedSpeed")
            .whenChangedBy(0.0625)
            .handle((speed) => {
            this.selectedSpeed = speed;
            this.handleCommandSpeed();
        });
        sub.on("selectedMachSpeed")
            .whenChanged()
            .handle((speed) => {
            this.machSpeed = speed;
            this.handleCommandSpeed();
        });
        sub.on("isInMach")
            .whenChanged()
            .handle((isInMach) => {
            this.isInMach = isInMach;
            this.handleCommandSpeed();
        });
    }
    render() {
        return (FSComponent.buildComponent("text", { x: "105", y: "80", class: "text-4 magenta" }, this.textContent));
    }
}
class MachGS extends DisplayComponent {
    constructor() {
        super(...arguments);
        this.machVisibility = Subject.create("hidden");
        this.gsVisibility = Subject.create("visible");
        this.machText = Subject.create(".000");
        this.gsText = Subject.create("0");
    }
    onAfterRender(node) {
        super.onAfterRender(node);
        const sub = this.props.bus.getSubscriber();
        sub.on("machSpeed")
            .whenChangedBy(0.002)
            .handle((mach) => {
            this.machVisibility.set(mach >= 0.4 ? "visible" : "hidden");
            this.gsVisibility.set(mach < 0.4 ? "visible" : "hidden");
            this.machText.set(mach.toFixed(3).replace("0", ""));
        });
        sub.on("groundSpeed")
            .whenChangedBy(0.125)
            .handle((gs) => this.gsText.set(Math.round(gs).toString()));
    }
    render() {
        return (FSComponent.buildComponent("g", null,
            FSComponent.buildComponent("text", { x: "100", y: "730", class: "text-4", visibility: this.machVisibility }, this.machText),
            FSComponent.buildComponent("g", { visibility: this.gsVisibility },
                FSComponent.buildComponent("text", { x: "46", y: "730", class: "text-3" }, "GS"),
                FSComponent.buildComponent("text", { x: "110", y: "730", class: "text-4" }, this.gsText))));
    }
}

/**
 * Copyright (C) 2022 Salty Simulations and its contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */
class AltitudeScroller extends DisplayComponent {
    constructor() {
        super(...arguments);
        this.tenThousandsTransform = Subject.create("");
        this.thousandsTransform = Subject.create("");
        this.hundredsTransform = Subject.create("");
        this.twentiesTransform = Subject.create("");
        this.boxColor = Subject.create("white");
        this.boxStroke = Subject.create(3);
    }
    getTenThousandsScrollerY(altitude) {
        let scroll = Math.floor(altitude / 10000) * 49;
        if (Math.floor(altitude).toString().slice(-4, -1) == "998" || Math.floor(altitude).toString().slice(-4, -1) == "999") {
            const altOver9980 = Math.round(altitude / 10000) * 10000 - 20 - altitude;
            scroll = scroll - altOver9980 * (altitude >= 0 ? 2.45 : -2.45);
        }
        return scroll;
    }
    getThousandsScrollerY(altitude) {
        const value = altitude % 10000;
        let scroll = altitude >= 0 ? Math.floor(value / 1000) * 49 : Math.ceil(value / 1000) * -49;
        if (Math.floor(value).toString().slice(-3, -1) == "98" || Math.floor(value).toString().slice(-3, -1) == "99") {
            const altOver9980 = Math.round(value / 1000) * 1000 - 20 - value;
            scroll = scroll - altOver9980 * (altitude >= 0 ? 2.45 : -2.45);
        }
        return scroll;
    }
    getHundredsScrollerY(altitude) {
        const value = altitude % 1000;
        let scroll = altitude >= 0 ? Math.floor(value / 100) * 49 : Math.ceil(value / 100) * -49;
        if (Math.floor(value).toString().slice(-2, -1) == "8" || Math.floor(value).toString().slice(-2, -1) == "9") {
            const altOver80 = Math.round(value / 100) * 100 - 20 - value;
            scroll = scroll - altOver80 * (altitude >= 0 ? 2.45 : -2.45);
        }
        return scroll;
    }
    getTwentiesScrollerY(altitude) {
        const value = altitude % 100;
        return altitude >= 0 ? value * 1.3 : -value * 1.3;
    }
    onAfterRender(node) {
        super.onAfterRender(node);
        const sub = this.props.bus.getSubscriber();
        sub.on("altitude")
            .withPrecision(0)
            .handle((altitude) => {
            this.tenThousandsTransform.set(`translate(0 ${this.getTenThousandsScrollerY(altitude)})`);
            this.thousandsTransform.set(`translate(0 ${this.getThousandsScrollerY(altitude)})`);
            this.hundredsTransform.set(`translate(0 ${this.getHundredsScrollerY(altitude)})`);
            this.twentiesTransform.set(`translate(0 ${this.getTwentiesScrollerY(altitude)})`);
        });
        sub.on("altAlertStatus")
            .whenChanged()
            .handle((status) => {
            this.boxColor.set(status != 2 ? "white" : "#ffc400");
            this.boxStroke.set(status != 0 ? 9 : 3);
        });
    }
    render() {
        return (FSComponent.buildComponent("g", null,
            FSComponent.buildComponent(BlackOutlineLine, { d: "M 632 342 h 104 v 78 h -104 v -28 l -14 -11 l 14 -11 Z", blackStroke: 5, whiteStroke: this.boxStroke, color: this.boxColor }),
            FSComponent.buildComponent("clipPath", { id: "alt-clip" },
                FSComponent.buildComponent("path", { d: "M 632 350 h 104 v 62 h -104 Z" })),
            FSComponent.buildComponent("g", { "clip-path": "url(#alt-clip)" },
                FSComponent.buildComponent("g", { transform: this.tenThousandsTransform },
                    Array.from({ length: 6 }, (_, i) => (FSComponent.buildComponent("text", { class: i === 5 ? "tenk-marker" : "text-4", x: i === 5 ? 658 : 659, y: i === 5 ? 396 : 151 + 49 * i }, i == 5 ? "@" : (5 - i).toString()))),
                    FSComponent.buildComponent("text", { class: "text-4", x: "659", y: "445" }, "-")),
                FSComponent.buildComponent("g", { class: "text-4", transform: this.thousandsTransform },
                    Array.from({ length: 10 }, (_, i) => (FSComponent.buildComponent("text", { x: "681", y: -45 + 49 * i }, (9 - i).toString()))),
                    FSComponent.buildComponent("text", { x: "681", y: "-94" }, "0")),
                FSComponent.buildComponent("g", { class: "text-3", transform: this.hundredsTransform },
                    Array.from({ length: 10 }, (_, i) => (FSComponent.buildComponent("text", { x: "700", y: -49 + 49 * i }, (9 - i).toString()))),
                    FSComponent.buildComponent("text", { x: "700", y: "-147" }, "1"),
                    FSComponent.buildComponent("text", { x: "700", y: "-98" }, "0"),
                    FSComponent.buildComponent("text", { x: "700", y: "439" }, "9")),
                FSComponent.buildComponent("g", { class: "text-3", transform: this.twentiesTransform },
                    Array.from({ length: 5 }, (_, i) => {
                        const text = (((9 - i) * 20) % 100).toFixed(0);
                        return (FSComponent.buildComponent("text", { x: "732", y: 26 * i + 288 }, text === "0" ? "00" : text));
                    }),
                    FSComponent.buildComponent("text", { x: "732", y: "236" }, "20"),
                    FSComponent.buildComponent("text", { x: "732", y: "262" }, "00"),
                    FSComponent.buildComponent("text", { x: "732", y: "418" }, "80")))));
    }
}

/**
 * Copyright (C) 2022 Salty Simulations and its contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */
class MetresDisplay extends DisplayComponent {
    constructor() {
        super(...arguments);
        this.isMetresOn = false;
        this.visibility = Subject.create("hidden");
        this.metresText = Subject.create(0);
        this.selectedMetresText = Subject.create(0);
    }
    feetToMeters(feet) {
        return Math.round(feet * 0.3048);
    }
    onAfterRender(node) {
        super.onAfterRender(node);
        const sub = this.props.bus.getSubscriber();
        sub.on("isMetresOn")
            .whenChanged()
            .handle((isMetresOn) => {
            this.isMetresOn = isMetresOn;
            this.visibility.set(isMetresOn ? "visible" : "hidden");
        });
        sub.on("altitude")
            .withPrecision(0)
            .handle((altitude) => {
            this.metresText.set(this.feetToMeters(altitude));
        });
        sub.on("selectedAltitude")
            .withPrecision(0)
            .handle((altitude) => {
            this.selectedMetresText.set(this.feetToMeters(altitude));
        });
        const hEventSub = this.props.bus.getSubscriber();
        hEventSub.on("hEvent").handle((event) => {
            if (event === "B777_PFD_MTRS") {
                SimVar.SetSimVarValue("L:77S_EFIS_METRES_ON", "Bool", !this.isMetresOn);
            }
        });
    }
    render() {
        return (FSComponent.buildComponent("g", { visibility: this.visibility },
            FSComponent.buildComponent("g", null,
                FSComponent.buildComponent(BlackOutlineLine, { d: "M 632 314, h 104, v 30, h-104, Z", blackStroke: 5 }),
                FSComponent.buildComponent("text", { x: "715", y: "339", class: "text-3 end" }, this.metresText),
                FSComponent.buildComponent("text", { x: "728", y: "339", class: "text-2 cyan end" }, "M")),
            FSComponent.buildComponent("g", null,
                FSComponent.buildComponent("text", { x: "681", y: "41", class: "text-3 magenta end" }, this.selectedMetresText),
                FSComponent.buildComponent("text", { x: "682", y: "41", class: "text-2 cyan start" }, "M"))));
    }
}

/**
 * Copyright (C) 2022 Salty Simulations and its contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */
class BaroSetting extends DisplayComponent {
    constructor() {
        super(...arguments);
        this.units = false;
        this.baroHg = 0;
        this.preselBaro = 0;
        this.stdVisibility = Subject.create("hidden");
        this.valueRef = FSComponent.createRef();
        this.unitsRef = FSComponent.createRef();
        this.preselVisibility = Subject.create("hidden");
        this.preselContent = Subject.create("");
    }
    onAfterRender(node) {
        super.onAfterRender(node);
        const sub = this.props.bus.getSubscriber();
        sub.on("isStd")
            .whenChanged()
            .handle((std) => {
            this.stdVisibility.set(std ? "visible" : "hidden");
            this.valueRef.instance.style.visibility = std ? "hidden" : "visible";
            this.unitsRef.instance.style.visibility = std ? "hidden" : "visible";
        });
        sub.on("baroUnits")
            .whenChanged()
            .handle((units) => {
            this.units = units;
            this.valueRef.instance.setAttribute("x", units ? "680" : "685");
            this.valueRef.instance.innerHTML = this.units ? (this.baroHg * 33.86).toFixed(0) : this.baroHg.toFixed(2);
            this.unitsRef.instance.setAttribute("x", units ? "725" : "715");
            this.unitsRef.instance.innerHTML = units ? " HPA" : " IN";
            this.preselContent.set(this.units ? (this.preselBaro / 1600).toFixed(0) + " HPA" : (this.preselBaro / 54182.4).toFixed(2) + " IN");
        });
        sub.on("baroHg")
            .whenChanged()
            .handle((baro) => {
            this.baroHg = baro;
            this.valueRef.instance.innerHTML = this.units ? (this.baroHg * 33.86).toFixed(0) : this.baroHg.toFixed(2);
        });
        sub.on("preselBaroVisible")
            .whenChanged()
            .handle((presel) => this.preselVisibility.set(presel ? "visible" : "hidden"));
        sub.on("preselBaro")
            .whenChanged()
            .handle((baro) => {
            this.preselBaro = baro;
            this.preselContent.set(this.units ? (this.preselBaro / 1600).toFixed(0) + " HPA" : (this.preselBaro / 54182.4).toFixed(2) + " IN");
        });
    }
    render() {
        return (FSComponent.buildComponent("g", null,
            FSComponent.buildComponent("text", { x: "682", y: "710", class: "text-4 green", visibility: this.stdVisibility }, "STD"),
            FSComponent.buildComponent("text", { y: "710", class: "text-3 green", ref: this.valueRef }),
            FSComponent.buildComponent("text", { y: "710", class: "text-2 green", ref: this.unitsRef }),
            FSComponent.buildComponent("text", { x: "720", y: "745", visibility: this.preselVisibility, class: "text-2" }, this.preselContent)));
    }
}

/**
 * Copyright (C) 2022 Salty Simulations and its contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */
class Minimums extends DisplayComponent {
    constructor() {
        super(...arguments);
        this.radioAltitude = 0;
        this.radioMinimums = 0;
        this.baroMinsVisibility = Subject.create("hidden");
        this.radioMinsVisibility = Subject.create("hidden");
        this.baroMinimumsValue = Subject.create(0);
        this.radioMinimumsValue = Subject.create(0);
        this.radioLabelClass = Subject.create("");
        this.radioValueClass = Subject.create("");
    }
    handleRadioMinimumsClass() {
        const classes = this.radioAltitude <= this.radioMinimums && this.radioAltitude > 1 ? "amber radio-mins-blink" : "green";
        this.radioLabelClass.set(`text-2 ${classes}`);
        this.radioValueClass.set(`text-3 ${classes}`);
    }
    onAfterRender(node) {
        super.onAfterRender(node);
        const sub = this.props.bus.getSubscriber();
        sub.on("baroMinimums")
            .whenChanged()
            .handle((minimums) => {
            this.baroMinsVisibility.set(minimums >= -100 ? "visible" : "hidden");
            this.baroMinimumsValue.set(minimums);
        });
        sub.on("radioMinimums")
            .whenChanged()
            .handle((minimums) => {
            this.radioMinimums = minimums;
            this.handleRadioMinimumsClass();
            this.radioMinsVisibility.set(minimums > 0 ? "visible" : "hidden");
            this.radioMinimumsValue.set(minimums);
        });
        sub.on("altAboveGround")
            .withPrecision(0)
            .handle((altitude) => {
            this.radioAltitude = altitude;
            this.handleRadioMinimumsClass();
        });
    }
    render() {
        return (FSComponent.buildComponent("g", null,
            FSComponent.buildComponent("g", { visibility: this.baroMinsVisibility },
                FSComponent.buildComponent("text", { x: "530", y: "638", class: "text-2 green" }, "BARO"),
                FSComponent.buildComponent("text", { x: "530", y: "668", class: "text-3 green" }, this.baroMinimumsValue)),
            FSComponent.buildComponent("g", { visibility: this.radioMinsVisibility },
                FSComponent.buildComponent("text", { x: "550", y: "85", class: this.radioLabelClass }, "RADIO"),
                FSComponent.buildComponent("text", { x: "550", y: "113", class: this.radioValueClass }, this.radioMinimumsValue))));
    }
}

/**
 * Copyright (C) 2022 Salty Simulations and its contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */
class RadioAltimeter extends DisplayComponent {
    constructor() {
        super(...arguments);
        this.radioAltitude = 0;
        this.radioMinimums = 0;
        this.radioAltimeterRef = FSComponent.createRef();
    }
    handleClass() {
        if (this.radioAltitude <= this.radioMinimums && this.radioAltitude > 1) {
            this.radioAltimeterRef.instance.classList.add("amber");
        }
        else {
            this.radioAltimeterRef.instance.classList.remove("amber");
        }
    }
    onAfterRender(node) {
        super.onAfterRender(node);
        const sub = this.props.bus.getSubscriber();
        sub.on("altAboveGround")
            .withPrecision(0)
            .handle((altitude) => {
            this.radioAltitude = altitude;
            let displayAltitude = 0;
            if (altitude > 500) {
                displayAltitude = Math.round(altitude / 20) * 20;
            }
            else if (altitude > 100) {
                displayAltitude = Math.round(altitude / 10) * 10;
            }
            else {
                displayAltitude = Math.round(altitude / 2) * 2;
            }
            this.radioAltimeterRef.instance.innerHTML = displayAltitude.toString();
            this.radioAltimeterRef.instance.style.visibility = altitude <= 2500 ? "visible" : "hidden";
            this.handleClass();
        });
        sub.on("radioMinimums")
            .whenChanged()
            .handle((minimums) => {
            this.radioMinimums = minimums;
            this.handleClass();
        });
    }
    render() {
        return FSComponent.buildComponent("text", { x: "550", y: "150", class: "text-4", ref: this.radioAltimeterRef });
    }
}

/**
 * Copyright (C) 2022 Salty Simulations and its contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */
class AltitudeTape extends DisplayComponent {
    constructor() {
        super(...arguments);
        this.originElevation = 0;
        this.destinationElevation = 0;
        this.isHalfway = false;
        this.transform = Subject.create("");
        this.bgD = Subject.create("");
        this.noTdzVisibility = Subject.create("hidden");
        this.tdzVisibility = Subject.create("hidden");
        this.tdzD = Subject.create("");
    }
    handleTdz() {
        const tdzUnavailable = this.originElevation === -1 && this.destinationElevation === -1;
        this.noTdzVisibility.set(tdzUnavailable ? "visible" : "hidden");
        this.tdzVisibility.set(tdzUnavailable ? "hidden" : "visible");
        this.tdzD.set(`M 550 ${382 + (this.isHalfway ? this.destinationElevation : this.originElevation) * -0.68}, h 100, m -5 0, l 5 5, m -5 -5, m -10.6 0, l 18 18,
            m-18 -18, m-10.6 0, l 28 28, m-28 -28, m-10.6 0, l38 38, m-38 -38,
            m-10.6 0, l38 38, m-38 -38, m-10.6 0, l38 38, m-38 -38, m-10.6 0,
            l38 38, m-38 -38, m-10.6 0, l38 38, m-38 -38, m-10.6 0, l38 38, m-38 -38,
            m-10.6 0, l38 38, m-10.6 0, l-27.5 -27.5, m0 10.6, l16.75 16.75`);
    }
    onAfterRender(node) {
        super.onAfterRender(node);
        const sub = this.props.bus.getSubscriber();
        sub.on("altitude")
            .withPrecision(0)
            .handle((altitude) => {
            this.transform.set(`translate(50 ${altitude * 0.68})`);
            this.bgD.set(`M 567 ${332 - altitude * 0.68}, h 73, v 100, h -73, Z`);
        });
        sub.on("originElevation")
            .whenChanged()
            .handle((elevation) => {
            this.originElevation = elevation;
            this.handleTdz();
        });
        sub.on("destinationElevation")
            .whenChanged()
            .handle((elevation) => {
            this.destinationElevation = elevation;
            this.handleTdz();
        });
        sub.on("passedHalfway")
            .whenChanged()
            .handle((halfway) => {
            this.isHalfway = halfway;
            this.handleTdz();
        });
    }
    // TODO: make 500 feet lines shorter
    render() {
        const lineStyle = "stroke-linejoin: miter; stroke-linecap: butt; paint-order: stroke;";
        return (FSComponent.buildComponent("g", null,
            FSComponent.buildComponent("clipPath", { id: "altitudetape-clip" },
                FSComponent.buildComponent("path", { d: "M575 100, h125, v560, h-125 Z" })),
            FSComponent.buildComponent("path", { class: "gray-bg", d: "M600 100, h100 v560 h-100 Z" }),
            FSComponent.buildComponent("g", { "clip-path": "url(#altitudetape-clip)" },
                FSComponent.buildComponent("g", { transform: this.transform },
                    Array.from({ length: 501 }, (_, i) => (FSComponent.buildComponent(BlackOutlineLine, { d: `${(i * 200) % 500 === 0 ? "M540" : "M550"} ${i * -68 + 382}, ${(i * 200) % 500 === 0 ? "h25" : "h15"}`, whiteStroke: (i * 200) % 500 === 0 ? 8 : 3, blackStroke: (i * 200) % 500 === 0 ? 10 : 5, styleColor: lineStyle, styleBlack: lineStyle }))),
                    Array.from({ length: 9 }, (_, i) => (FSComponent.buildComponent(BlackOutlineLine, { d: `${(i * 200) % 500 === 0 ? "M540" : "M550"} ${i * 68 + 382}, ${(i * 200) % 500 === 0 ? "h25" : "h15"}`, whiteStroke: (i * 200) % 500 === 0 ? 8 : 3, blackStroke: (i * 200) % 500 === 0 ? 10 : 5, styleColor: lineStyle, styleBlack: lineStyle }))),
                    Array.from({ length: 51 }, (_, i) => (FSComponent.buildComponent(FSComponent.Fragment, null,
                        FSComponent.buildComponent(BlackOutlineLine, { d: `M570 ${i * -680 + 365}, h79`, whiteStroke: 4, blackStroke: 5 }),
                        FSComponent.buildComponent(BlackOutlineLine, { d: `M570 ${i * -680 + 365 + 34}, h79`, whiteStroke: 4, blackStroke: 5 })))),
                    Array.from({ length: 251 }, (_, i) => {
                        const y = i * -136 + 382 + 11;
                        const text = (i * 200).toFixed(0);
                        const hundredsText = text.substring(text.length - 3);
                        let thousandsText = text.substring(0, 2);
                        if (i < 5) {
                            thousandsText = "";
                        }
                        else if (i < 50) {
                            thousandsText = text.substring(0, 1);
                        }
                        return (FSComponent.buildComponent(FSComponent.Fragment, null,
                            FSComponent.buildComponent("text", { x: "640", y: y, class: "text-2", "fill-opacity": 0.9 }, hundredsText),
                            FSComponent.buildComponent("text", { x: "603", y: y, class: "text-3", "fill-opacity": 0.9 }, thousandsText)));
                    }),
                    Array.from({ length: 5 }, (_, i) => {
                        const text = (i * 200).toFixed(0);
                        return (FSComponent.buildComponent("text", { x: "638", y: i * 136 + 382 + 11, class: "text-2", "fill-opacity": 0.85 }, i === 0 ? "" : `-${text.substring(text.length - 3)}`));
                    }),
                    FSComponent.buildComponent("path", { class: "gray-bg", d: this.bgD }),
                    FSComponent.buildComponent("g", { visibility: this.tdzVisibility },
                        FSComponent.buildComponent(BlackOutlineLine, { d: this.tdzD, color: "#ffc400", blackStroke: 5 })),
                    FSComponent.buildComponent(AltitudeBugs, { bus: this.props.bus }))),
            FSComponent.buildComponent("g", { visibility: this.noTdzVisibility },
                FSComponent.buildComponent("text", { x: "722", y: "645", class: "text-2 amber start" }, "NO"),
                FSComponent.buildComponent("text", { x: "722", y: "666", class: "text-2 amber start" }, "TDZ")),
            FSComponent.buildComponent(MetresDisplay, { bus: this.props.bus }),
            FSComponent.buildComponent(CommandAlt, { bus: this.props.bus }),
            FSComponent.buildComponent(BaroSetting, { bus: this.props.bus }),
            FSComponent.buildComponent(Minimums, { bus: this.props.bus }),
            FSComponent.buildComponent(RadioAltimeter, { bus: this.props.bus })));
    }
}
class AltitudeBugs extends DisplayComponent {
    constructor() {
        super(...arguments);
        this.altitude = 0;
        this.selectedAltitude = 0;
        this.altitudeBugD = Subject.create("");
        this.minimumsBugD = Subject.create("");
    }
    handleAltitudeBug() {
        this.altitudeBugD.set(`M 550 ${Math.max(382 + (this.altitude + 420) * -0.68, Math.min(382 + this.selectedAltitude * -0.68, 382 + (this.altitude - 410) * -0.68))}, l -10 15, v23, h50, v-76, h-50, v23, Z`);
    }
    onAfterRender(node) {
        super.onAfterRender(node);
        const sub = this.props.bus.getSubscriber();
        sub.on("altitude")
            .withPrecision(0)
            .handle((altitude) => {
            this.altitude = altitude;
            this.handleAltitudeBug();
        });
        sub.on("selectedAltitude")
            .withPrecision(0)
            .handle((altitude) => {
            this.selectedAltitude = altitude;
            this.handleAltitudeBug();
        });
        sub.on("baroMinimums")
            .whenChanged()
            .handle((minimums) => this.minimumsBugD.set(`M 650 ${382 + minimums * -0.68}, h -100, l-20 20, v -40, l20, 20`));
    }
    render() {
        return (FSComponent.buildComponent(FSComponent.Fragment, null,
            FSComponent.buildComponent(BlackOutlineLine, { d: this.minimumsBugD, color: "lime", whiteStroke: 5, blackStroke: 6 }),
            FSComponent.buildComponent(BlackOutlineLine, { d: this.altitudeBugD, color: "#d570ff", blackStroke: 5, styleBlack: "fill: none;", styleColor: "fill: none;" })));
    }
}
class CommandAlt extends DisplayComponent {
    constructor() {
        super(...arguments);
        this.smallSelAltText = Subject.create("");
        this.largeSelAltText = Subject.create("");
        this.altAlertVisibility = Subject.create("hidden");
    }
    getSmallSelAltText(altitude) {
        const string = altitude.toString();
        return string.substring(string.length - 3);
    }
    getLargeSelAltText(altitude) {
        return altitude < 1000 ? "" : altitude.toString().substring(0, altitude >= 10000 ? 2 : 1);
    }
    onAfterRender(node) {
        super.onAfterRender(node);
        const sub = this.props.bus.getSubscriber();
        sub.on("selectedAltitude")
            .withPrecision(0)
            .handle((altitude) => {
            this.smallSelAltText.set(this.getSmallSelAltText(altitude));
            this.largeSelAltText.set(this.getLargeSelAltText(altitude));
        });
        sub.on("altAlertStatus")
            .whenChanged()
            .handle((status) => this.altAlertVisibility.set(status === 1 ? "visible" : "hidden"));
    }
    render() {
        return (FSComponent.buildComponent("g", null,
            FSComponent.buildComponent("text", { x: "649", y: "80", class: "text-4 magenta" }, this.largeSelAltText),
            FSComponent.buildComponent("text", { x: "695", y: "80", class: "text-3 magenta" }, this.smallSelAltText),
            FSComponent.buildComponent("path", { stroke: "white", "stroke-width": "3", "stroke-linejoin": "round", d: "M 602 48, h 96, v35, h-96, Z", fill: "none", visibility: this.altAlertVisibility })));
    }
}

/**
 * Copyright (C) 2022 Salty Simulations and its contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */
class LateralDeviationScale extends DisplayComponent {
    constructor() {
        super(...arguments);
        this.inboundLocCourse = 0;
        this.locRadial = 0;
        this.locSignal = false;
        this.locFrequency = 0;
        this.radioHeight = 0;
        this.flightPhase = 0;
        this.diamondRef = FSComponent.createRef();
        this.risingRunwayTransform = Subject.create("");
        this.risingRunwayVisibility = Subject.create("hidden");
        this.risingRunwayD = Subject.create("");
        this.risingRunwayD2 = Subject.create("");
        this.circlesGroupVisibility = Subject.create("hidden");
        this.circlesVisibility = Subject.create("hidden");
        this.expandedLocVisibility = Subject.create("hidden");
    }
    getRisingRunwayY(height) {
        return height <= 200 ? -112 + Math.max(height * 0.56, -112) : 0;
    }
    showExpandedLoc(locIndbCourse, locRadial) {
        return Math.abs(locIndbCourse - (locRadial + 180 > 360 ? locRadial - 360 : locRadial + 180)) < 0.6;
    }
    isLocAtMaxDeflection(locIndbCourse, locRadial) {
        return Math.abs(locIndbCourse - (locRadial + 180 > 360 ? locRadial - 360 : locRadial + 180)) > 2.33;
    }
    getLocDisplacement(locIndbCourse, locRadial) {
        let x = locIndbCourse - (locRadial + 180 > 360 ? locRadial - 360 : locRadial + 180);
        if (x > 2.33) {
            x = 2.33;
        }
        else if (x < -2.33) {
            x = -2.33;
        }
        const sensitivity = this.showExpandedLoc(locIndbCourse, locRadial) ? 182 : 57;
        return 349 - x * sensitivity;
    }
    handleDeviationScale() {
        this.diamondRef.instance.style.transform = `translate(${this.getLocDisplacement(this.inboundLocCourse, this.locRadial)}px, 0px)`;
        this.diamondRef.instance.style.fill = this.isLocAtMaxDeflection(this.inboundLocCourse, this.locRadial) ? "none" : "#d570ff";
        this.risingRunwayTransform.set(`translate(${this.getLocDisplacement(this.inboundLocCourse, this.locRadial)}, ${this.getRisingRunwayY(this.radioHeight)})`);
        this.circlesVisibility.set(!this.showExpandedLoc(this.inboundLocCourse, this.locRadial) && this.locFrequency !== 0 ? "visible" : "hidden");
        this.expandedLocVisibility.set(this.showExpandedLoc(this.inboundLocCourse, this.locRadial) ? "visible" : "hidden");
    }
    onAfterRender(node) {
        super.onAfterRender(node);
        const sub = this.props.bus.getSubscriber();
        sub.on("inboundLocCourse")
            .whenChanged()
            .handle((course) => {
            this.inboundLocCourse = course;
            this.handleDeviationScale();
        });
        sub.on("locRadial")
            .whenChanged()
            .handle((radial) => {
            this.locRadial = radial;
            this.handleDeviationScale();
        });
        sub.on("locSignal")
            .whenChanged()
            .handle((signal) => {
            this.locSignal = signal;
            this.diamondRef.instance.style.visibility = this.locSignal ? "visible" : "hidden";
            this.risingRunwayVisibility.set(this.flightPhase >= 3 && this.radioHeight < 2500 && this.locSignal ? "visible" : "hidden");
        });
        sub.on("altAboveGround")
            .withPrecision(0)
            .handle((altitude) => {
            this.radioHeight = altitude;
            this.handleDeviationScale();
            this.risingRunwayTransform.set(`translate(${this.getLocDisplacement(this.inboundLocCourse, this.locRadial)}, ${this.getRisingRunwayY(this.radioHeight)})`);
            this.risingRunwayVisibility.set(this.flightPhase >= 3 && this.radioHeight < 2500 && this.locSignal ? "visible" : "hidden");
            this.risingRunwayD.set(`M -3 550, V${575 - this.getRisingRunwayY(this.radioHeight)}`);
            this.risingRunwayD2.set(`M 3 550, V${575 - this.getRisingRunwayY(this.radioHeight)}`);
        });
        sub.on("flightPhase")
            .whenChanged()
            .handle((phase) => {
            this.flightPhase = phase;
            this.risingRunwayVisibility.set(this.flightPhase >= 3 && this.radioHeight < 2500 && this.locSignal ? "visible" : "hidden");
        });
        sub.on("locFrequency")
            .whenChanged()
            .handle((frequency) => {
            this.locFrequency = frequency;
            this.handleDeviationScale();
            this.circlesGroupVisibility.set(frequency !== 0 ? "visible" : "hidden");
        });
    }
    render() {
        return (FSComponent.buildComponent("g", null,
            FSComponent.buildComponent("path", { d: "M 0 585, l-20 10, l20 10, l20, -10, Z", class: "line", stroke: "#d570ff", "stroke-width": "3", ref: this.diamondRef }),
            FSComponent.buildComponent("g", { transform: this.risingRunwayTransform, visibility: this.risingRunwayVisibility, fill: "none" },
                FSComponent.buildComponent(BlackOutlineLine, { d: "M 0 545, h-100, l10 -20, h180, l10 20, h-100, v-20 Z", color: "lime", blackStroke: 5 }),
                FSComponent.buildComponent(BlackOutlineLine, { d: this.risingRunwayD, color: "#d570ff", blackStroke: 5 }),
                FSComponent.buildComponent(BlackOutlineLine, { d: this.risingRunwayD2, color: "#d570ff", blackStroke: 5 })),
            FSComponent.buildComponent("g", { visibility: this.circlesGroupVisibility },
                FSComponent.buildComponent(BlackOutlineLine, { d: "M349 580, v30", blackStroke: 6, whiteStroke: 4 }),
                FSComponent.buildComponent("g", { visibility: this.circlesVisibility },
                    FSComponent.buildComponent("circle", { cx: "292", cy: "595", r: "6", fill: "none", class: "fpv-outline" }),
                    FSComponent.buildComponent("circle", { cx: "292", cy: "595", r: "6", fill: "none", class: "fpv-line" }),
                    FSComponent.buildComponent("circle", { cx: "235", cy: "595", r: "6", fill: "none", class: "fpv-outline" }),
                    FSComponent.buildComponent("circle", { cx: "235", cy: "595", r: "6", fill: "none", class: "fpv-line" }),
                    FSComponent.buildComponent("circle", { cx: "406", cy: "595", r: "6", fill: "none", class: "fpv-outline" }),
                    FSComponent.buildComponent("circle", { cx: "406", cy: "595", r: "6", fill: "none", class: "fpv-line" }),
                    FSComponent.buildComponent("circle", { cx: "463", cy: "595", r: "6", fill: "none", class: "fpv-outline" }),
                    FSComponent.buildComponent("circle", { cx: "463", cy: "595", r: "6", fill: "none", class: "fpv-line" })),
                FSComponent.buildComponent("g", { visibility: this.expandedLocVisibility },
                    FSComponent.buildComponent(BlackOutlineLine, { d: "M252 589, h12, v12, h-12, Z", blackStroke: 6, whiteStroke: 4, styleBlack: "fill: none;", styleColor: "fill: none;" }),
                    FSComponent.buildComponent(BlackOutlineLine, { d: "M446 589, h-12, v12, h12, Z", blackStroke: 6, whiteStroke: 4, styleBlack: "fill: none;", styleColor: "fill: none;" }))),
            FSComponent.buildComponent("path", { d: "M111 175, h45, v405, h-45 Z" }),
            FSComponent.buildComponent("path", { d: "M539 175, h45, v405, h-45 Z" })));
    }
}

/**
 * Copyright (C) 2022 Salty Simulations and its contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */
class VerticalDeviationScale extends DisplayComponent {
    constructor() {
        super(...arguments);
        this.pathRef = FSComponent.createRef();
        this.circlesVisibility = Subject.create("hidden");
    }
    getGsDisplacement(gsError) {
        let boundedY = gsError * -2.44;
        if (boundedY > 2.33) {
            boundedY = 2.33;
        }
        else if (boundedY < -2.33) {
            boundedY = -2.33;
        }
        return 381 - boundedY * 57;
    }
    isGsAtMaxDeflection(gsError) {
        return Math.abs(gsError) > 0.9553;
    }
    onAfterRender(node) {
        super.onAfterRender(node);
        const sub = this.props.bus.getSubscriber();
        sub.on("gsSignal")
            .whenChanged()
            .handle((signal) => (this.pathRef.instance.style.visibility = signal ? "visible" : "hidden"));
        sub.on("gsError")
            .whenChanged()
            .handle((error) => {
            this.pathRef.instance.setAttribute("d", `M 547 ${this.getGsDisplacement(error)}, l10 20, l10 -20, l-10 -20, Z`);
            this.pathRef.instance.style.fill = this.isGsAtMaxDeflection(error) ? "none" : "#d570ff";
        });
        sub.on("locFrequency")
            .whenChanged()
            .handle((frequency) => this.circlesVisibility.set(frequency !== 0 ? "visible" : "hidden"));
    }
    render() {
        return (FSComponent.buildComponent("g", null,
            FSComponent.buildComponent("path", { class: "line", stroke: "#d570ff", "stroke-width": "3", ref: this.pathRef }),
            FSComponent.buildComponent("g", { visibility: this.circlesVisibility },
                FSComponent.buildComponent(BlackOutlineLine, { d: "M542 381, h30", whiteStroke: 4, blackStroke: 6 }),
                FSComponent.buildComponent("circle", { cx: "557", cy: "438", r: "6", fill: "none", class: "fpv-outline" }),
                FSComponent.buildComponent("circle", { cx: "557", cy: "438", r: "6", fill: "none", class: "fpv-line" }),
                FSComponent.buildComponent("circle", { cx: "557", cy: "495", r: "6", fill: "none", class: "fpv-outline" }),
                FSComponent.buildComponent("circle", { cx: "557", cy: "495", r: "6", fill: "none", class: "fpv-line" }),
                FSComponent.buildComponent("circle", { cx: "557", cy: "324", r: "6", fill: "none", class: "fpv-outline" }),
                FSComponent.buildComponent("circle", { cx: "557", cy: "324", r: "6", fill: "none", class: "fpv-line" }),
                FSComponent.buildComponent("circle", { cx: "557", cy: "267", r: "6", fill: "none", class: "fpv-outline" }),
                FSComponent.buildComponent("circle", { cx: "557", cy: "267", r: "6", fill: "none", class: "fpv-line" }))));
    }
}

/**
 * Copyright (C) 2022 Salty Simulations and its contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */
// TODO: RNP/ANP source
class ApproachInfo extends DisplayComponent {
    constructor() {
        super(...arguments);
        this.locFrequency = 0;
        this.ilsIdent = "";
        this.ilsHasSignal = false;
        this.locCourse = 0;
        this.dmeHasSignal = false;
        this.dmeDistance = 0;
        this.visibility = Subject.create("hidden");
        this.ilsText = Subject.create("");
        this.dmeText = Subject.create("");
    }
    getILSText(frequency, ident, hasSignal, course) {
        let courseString = "";
        if (course < 10) {
            courseString = `00${course.toFixed(0)}°`;
        }
        else if (course < 100) {
            courseString = `0${course.toFixed(0)}°`;
        }
        else {
            courseString = `${course.toFixed(0)}°`;
        }
        return `${hasSignal ? ident : frequency.toFixed(2)}/${courseString}`;
    }
    getDMEText(hasSignal, distance) {
        const roundedDist = distance < 100 ? distance.toFixed(1) : distance.toFixed(0);
        return `DME\xa0${hasSignal && distance > 0 ? roundedDist : "---"}`;
    }
    onAfterRender(node) {
        super.onAfterRender(node);
        const sub = this.props.bus.getSubscriber();
        sub.on("locFrequency")
            .whenChanged()
            .handle((frequency) => {
            this.locFrequency = frequency;
            this.visibility.set(frequency !== 0 ? "visible" : "hidden");
            this.ilsText.set(this.getILSText(this.locFrequency, this.ilsIdent, this.ilsHasSignal, this.locCourse));
        });
        sub.on("ilsIdent")
            .whenChanged()
            .handle((ident) => {
            this.ilsIdent = ident;
            this.ilsText.set(this.getILSText(this.locFrequency, this.ilsIdent, this.ilsHasSignal, this.locCourse));
        });
        sub.on("locSignal")
            .whenChanged()
            .handle((signal) => {
            this.ilsHasSignal = signal;
            this.ilsText.set(this.getILSText(this.locFrequency, this.ilsIdent, this.ilsHasSignal, this.locCourse));
        });
        sub.on("locCourse")
            .whenChanged()
            .handle((course) => {
            this.locCourse = course;
            this.ilsText.set(this.getILSText(this.locFrequency, this.ilsIdent, this.ilsHasSignal, this.locCourse));
        });
        sub.on("dmeSignal")
            .whenChanged()
            .handle((signal) => {
            this.dmeHasSignal = signal;
            this.dmeText.set(this.getDMEText(this.dmeHasSignal, this.dmeDistance));
        });
        sub.on("dmeDistance")
            .withPrecision(1)
            .handle((distance) => {
            this.dmeDistance = distance;
            this.dmeText.set(this.getDMEText(this.dmeHasSignal, this.dmeDistance));
        });
    }
    render() {
        return (FSComponent.buildComponent("g", { visibility: this.visibility },
            FSComponent.buildComponent("text", { x: "160", y: "100", class: "text-2 start" }, this.ilsText),
            FSComponent.buildComponent("text", { x: "160", y: "127", class: "text-2 start" }, this.dmeText)));
    }
}

/**
 * Copyright (C) 2022 Salty Simulations and its contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */
class FMAColumn extends DisplayComponent {
    constructor() {
        super(...arguments);
        this.topText = "";
        this.greenBoxVisibility = Subject.create("hidden");
    }
    handleBox(text) {
        if (text) {
            this.greenBoxVisibility.set("visible");
            setTimeout(() => this.greenBoxVisibility.set("hidden"), 10000);
        }
        else
            this.greenBoxVisibility.set("hidden");
    }
    onAfterRender(node) {
        var _a, _b;
        super.onAfterRender(node);
        (_a = this.props.topText) === null || _a === void 0 ? void 0 : _a.sub((text) => {
            this.topText = text;
            this.handleBox(text);
        });
        (_b = this.props.extraHighlightVar) === null || _b === void 0 ? void 0 : _b.sub((_) => this.handleBox(this.topText));
    }
    render() {
        return (FSComponent.buildComponent("g", null,
            FSComponent.buildComponent("g", { visibility: this.greenBoxVisibility },
                FSComponent.buildComponent("rect", { x: this.props.x - 65, y: this.props.y, width: "130", height: "27", fill: "none", class: "line", stroke: "black", "stroke-width": "5" }),
                FSComponent.buildComponent("rect", { x: this.props.x - 65, y: this.props.y, width: "130", height: "27", fill: "none", class: "line", stroke: "lime", "stroke-width": "3" })),
            FSComponent.buildComponent("text", { x: this.props.x, y: this.props.y + 25, class: "text-3 green middle" }, this.props.topText),
            FSComponent.buildComponent("text", { x: this.props.x, y: this.props.y + 48, class: "text-2 middle" }, this.props.bottomText)));
    }
}

/**
 * Copyright (C) 2022 Salty Simulations and its contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */
class AFDSStatus extends DisplayComponent {
    constructor() {
        super(...arguments);
        this.afdsStatus = Subject.create(0);
        this.afdsStatusText = Subject.create("");
        this.autolandClass = Subject.create("");
        this.noAutolandVisibility = Subject.create("hidden");
        this.greenBoxVisibility = Subject.create("hidden");
        this.amberBoxVisibility = Subject.create("hidden");
        this.afdsStatuses = ["", "FD", "CMD", "LAND 2", "LAND 3", "AUTOLAND"];
    }
    handleAFDSBoxes(text) {
        // sunday morning is every day for all i care
        if (text) {
            if (text === "AUTOLAND") {
                this.greenBoxVisibility.set("hidden");
                this.amberBoxVisibility.set("visible");
                setTimeout(() => this.amberBoxVisibility.set("hidden"), 10000);
            }
            this.amberBoxVisibility.set("hidden");
            this.greenBoxVisibility.set("visible");
            setTimeout(() => this.greenBoxVisibility.set("hidden"), 10000);
        }
        else {
            this.greenBoxVisibility.set("hidden");
            this.amberBoxVisibility.set("hidden");
        }
    }
    onAfterRender(node) {
        super.onAfterRender(node);
        const sub = this.props.bus.getSubscriber();
        sub.on("afdsStatus")
            .whenChanged()
            .handle((status) => {
            const text = status < this.afdsStatuses.length ? this.afdsStatuses[status] : "";
            this.afdsStatus.set(status);
            this.afdsStatusText.set(text);
            this.autolandClass.set(text === "AUTOLAND" ? "text-4 amber middle" : "text-4 green middle");
            this.noAutolandVisibility.set(text === "AUTOLAND" ? "visible" : "hidden");
            this.handleAFDSBoxes(text);
        });
    }
    render() {
        return (FSComponent.buildComponent("g", null,
            FSComponent.buildComponent("text", { x: "349", y: "165", class: this.autolandClass }, this.afdsStatusText),
            FSComponent.buildComponent("text", { x: "349", y: "133", visibility: this.noAutolandVisibility, class: this.autolandClass }, "NO"),
            FSComponent.buildComponent("rect", { x: "267", y: "133", visibility: this.greenBoxVisibility, width: "164", height: "34", fill: "none", class: "line", stroke: "lime", "stroke-width": "3" }),
            FSComponent.buildComponent("path", { d: "M 267 133, h59, v-34, h46, v34, h59, v34, h-164, Z", visibility: this.amberBoxVisibility, class: "line", stroke: "#ffc400", "stroke-width": "3", fill: "none" })));
    }
}

/**
 * Copyright (C) 2022 Salty Simulations and its contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */
class FMA extends DisplayComponent {
    constructor() {
        super(...arguments);
        this.apOn = false;
        this.fdOn = Subject.create(false);
        this.autothrottleModes = ["", "THR REF", "THR", "IDLE", "SPD", "HOLD"];
        this.autothrottleArmed = Subject.create(false);
        this.autothrottleMode = Subject.create(0);
        this.activeAutothrottleText = Subject.create("");
        this.activeRollModes = ["", "TO/GA", "HDG HOLD", "HDG SEL", "LNAV", "LOC", "FAC", "ROLLOUT", "ATT"];
        this.armedRollModes = ["", "LOC", "FAC", "LNAV", "ROLLOUT"];
        this.activeRollMode = 0;
        this.armedRollText = Subject.create("");
        this.activeRollText = Subject.create("");
        this.activePitchModes = ["", "TO/GA", "ALT", "VNAV ALT", "VNAV PTH", "VNAV SPD", "VNAV", "FLCH SPD", "V/S", "G/S", "G/P", "FLARE"];
        this.armedPitchModes = ["", "G/S", "G/P", "VNAV", "FLARE"];
        this.activePitchText = Subject.create("");
        this.armedPitchText = Subject.create("");
    }
    handleAutothrottleMode() {
        this.activeAutothrottleText.set(this.autothrottleMode.get() < this.autothrottleModes.length && this.autothrottleArmed.get()
            ? this.autothrottleModes[this.autothrottleMode.get()]
            : "");
    }
    handleActiveRollMode() {
        this.activeRollText.set(this.activeRollMode < this.activeRollModes.length && (this.fdOn.get() || this.apOn) ? this.activeRollModes[this.activeRollMode] : "");
    }
    onAfterRender(node) {
        super.onAfterRender(node);
        const sub = this.props.bus.getSubscriber();
        sub.on("autothrottleArmed")
            .whenChanged()
            .handle((armed) => {
            this.autothrottleArmed.set(armed);
            this.handleAutothrottleMode();
        });
        sub.on("autothrottleMode")
            .whenChanged()
            .handle((mode) => {
            this.autothrottleMode.set(mode);
            this.handleAutothrottleMode();
        });
        sub.on("armedRollMode")
            .whenChanged()
            .handle((mode) => this.armedRollText.set(mode < this.armedRollModes.length ? this.armedRollModes[mode] : ""));
        sub.on("activeRollMode")
            .whenChanged()
            .handle((mode) => {
            this.activeRollMode = mode;
            this.handleActiveRollMode();
        });
        sub.on("fdOn")
            .whenChanged()
            .handle((fdOn) => {
            this.fdOn.set(fdOn);
            this.handleActiveRollMode();
        });
        sub.on("apOn")
            .whenChanged()
            .handle((apOn) => {
            this.apOn = apOn;
            this.handleActiveRollMode();
        });
        sub.on("activePitchMode")
            .whenChanged()
            .handle((mode) => this.activePitchText.set(mode < this.activePitchModes.length ? this.activePitchModes[mode] : ""));
        sub.on("armedPitchMode")
            .whenChanged()
            .handle((mode) => this.armedPitchText.set(mode < this.armedPitchModes.length ? this.armedPitchModes[mode] : ""));
    }
    render() {
        return (FSComponent.buildComponent("g", null,
            FSComponent.buildComponent("path", { class: "gray-bg", d: "M130 10, h450, v50, h-450 Z" }),
            FSComponent.buildComponent(FMAColumn, { x: 208, y: 10, topText: this.activeAutothrottleText }),
            FSComponent.buildComponent(FMAColumn, { x: 356, y: 10, topText: this.activeRollText, bottomText: this.armedRollText, extraHighlightVar: this.fdOn }),
            FSComponent.buildComponent(FMAColumn, { x: 505, y: 10, topText: this.activePitchText, bottomText: this.armedPitchText, extraHighlightVar: this.fdOn }),
            FSComponent.buildComponent(AFDSStatus, { bus: this.props.bus }),
            FSComponent.buildComponent(BlackOutlineLine, { d: "M286 10, v50" }),
            FSComponent.buildComponent(BlackOutlineLine, { d: "M428 10, v50" })));
    }
}

/**
 * Copyright (C) 2022 Salty Simulations and its contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */
class PFD extends DisplayComponent {
    render() {
        return (FSComponent.buildComponent("svg", { className: "pfd-svg", viewBox: "0 0 800 800", xmlns: "http://www.w3.org/2000/svg" },
            FSComponent.buildComponent(Horizon, { bus: this.props.bus }),
            FSComponent.buildComponent(LateralDeviationScale, { bus: this.props.bus }),
            FSComponent.buildComponent(VerticalDeviationScale, { bus: this.props.bus }),
            FSComponent.buildComponent(VerticalSpeedIndicator, { bus: this.props.bus }),
            FSComponent.buildComponent(HeadingDisplay, { bus: this.props.bus }),
            FSComponent.buildComponent(SpeedTape, { bus: this.props.bus }),
            FSComponent.buildComponent(AirspeedScroller, { bus: this.props.bus }),
            FSComponent.buildComponent(AltitudeTape, { bus: this.props.bus }),
            FSComponent.buildComponent(AltitudeScroller, { bus: this.props.bus }),
            FSComponent.buildComponent(ApproachInfo, { bus: this.props.bus }),
            FSComponent.buildComponent(FMA, { bus: this.props.bus })));
    }
}

/**
 * Copyright (C) 2022 Salty Simulations and its contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */
var PFDVars;
(function (PFDVars) {
    PFDVars["pitch"] = "PLANE PITCH DEGREES";
    PFDVars["roll"] = "PLANE BANK DEGREES";
    PFDVars["sideslip"] = "INCIDENCE BETA";
    PFDVars["altitude"] = "INDICATED ALTITUDE";
    PFDVars["airspeed"] = "AIRSPEED INDICATED";
    PFDVars["groundSpeed"] = "GROUND VELOCITY";
    PFDVars["maneuveringSpeed"] = "L:77S_ADC_MANEUVERING_SPEED";
    PFDVars["machSpeed"] = "L:77S_ADC_MACH_NUMBER";
    PFDVars["maxSpeed"] = "L:77S_ADC_MAXIMUM_SPEED";
    PFDVars["minSpeed"] = "L:77S_ADC_MINIMUM_SPEED";
    PFDVars["flapsHandle"] = "FLAPS HANDLE INDEX";
    PFDVars["actualFlapAngle"] = "TRAILING EDGE FLAPS LEFT ANGLE";
    PFDVars["landingFlaps"] = "L:SALTY_SELECTED_APPROACH_FLAP";
    PFDVars["takeoffFlaps"] = "L:SALTY_TAKEOFF_FLAP_VALUE";
    PFDVars["altAboveGround"] = "PLANE ALT ABOVE GROUND MINUS CG";
    PFDVars["incidenceAlpha"] = "INCIDENCE ALPHA";
    PFDVars["stallAlpha"] = "STALL ALPHA";
    PFDVars["fdPitch"] = "AUTOPILOT FLIGHT DIRECTOR PITCH";
    PFDVars["fdRoll"] = "AUTOPILOT FLIGHT DIRECTOR BANK";
    PFDVars["irsState"] = "L:SALTY_IRS_STATE";
    PFDVars["fdOn"] = "AUTOPILOT FLIGHT DIRECTOR ACTIVE:1";
    PFDVars["verticalVelocity"] = "VELOCITY WORLD Y";
    PFDVars["horizontalVelocity"] = "VELOCITY BODY Z";
    PFDVars["trueHeading"] = "PLANE HEADING DEGREES TRUE";
    PFDVars["magneticHeading"] = "PLANE HEADING DEGREES MAGNETIC";
    PFDVars["trueTrack"] = "GPS GROUND TRUE TRACK";
    PFDVars["magneticTrack"] = "GPS GROUND MAGNETIC TRACK";
    PFDVars["fpvOn"] = "L:SALTY_FPV_ON";
    PFDVars["markerBeaconState"] = "MARKER BEACON STATE";
    PFDVars["verticalSpeed"] = "VERTICAL SPEED";
    PFDVars["vsActive"] = "L:AP_VS_ACTIVE";
    PFDVars["selectedVs"] = "AUTOPILOT VERTICAL HOLD VAR";
    PFDVars["selectedHeading"] = "AUTOPILOT HEADING LOCK DIR:1";
    PFDVars["selectedSpeed"] = "AUTOPILOT AIRSPEED HOLD VAR";
    PFDVars["selectedMachSpeed"] = "AUTOPILOT MACH HOLD VAR";
    PFDVars["selectedAltitude"] = "AUTOPILOT ALTITUDE LOCK VAR:3";
    PFDVars["v1"] = "L:AIRLINER_V1_SPEED";
    PFDVars["vR"] = "L:AIRLINER_VR_SPEED";
    PFDVars["v2"] = "L:AIRLINER_V2_SPEED";
    PFDVars["vRef20"] = "L:SALTY_VREF20";
    PFDVars["vRef25"] = "L:SALTY_VREF25";
    PFDVars["vRef30"] = "L:SALTY_VREF30";
    PFDVars["vRef"] = "L:AIRLINER_VREF_SPEED";
    PFDVars["flightPhase"] = "L:AIRLINER_FLIGHT_PHASE";
    PFDVars["onGround"] = "SIM ON GROUND";
    PFDVars["isInMach"] = "L:XMLVAR_AirSpeedIsInMach";
    PFDVars["altAlertStatus"] = "L:77S_ALT_ALERT";
    PFDVars["originElevation"] = "L:77S_FMC_ORIGIN_ELEVATION";
    PFDVars["destinationElevation"] = "L:77S_FMC_DEST_ELEVATION";
    PFDVars["passedHalfway"] = "L:77S_FMC_PASSED_HALFWAY";
    PFDVars["baroMinimums"] = "L:77S_MINS_BARO";
    PFDVars["radioMinimums"] = "L:77S_MINS_RADIO";
    PFDVars["isMetresOn"] = "L:77S_EFIS_METRES_ON";
    PFDVars["isStd"] = "L:XMLVAR_Baro1_ForcedToSTD";
    PFDVars["baroUnits"] = "L:XMLVAR_Baro_Selector_HPA_1";
    PFDVars["baroHg"] = "KOHLSMAN SETTING HG";
    PFDVars["preselBaroVisible"] = "L:77S_BARO_PRESEL_VISIBLE";
    PFDVars["preselBaro"] = "L:XMLVAR_Baro1_SavedPressure";
    PFDVars["inboundLocCourse"] = "NAV LOCALIZER:3";
    PFDVars["locRadial"] = "NAV RADIAL:3";
    PFDVars["locSignal"] = "NAV HAS NAV:3";
    PFDVars["locFrequency"] = "NAV ACTIVE FREQUENCY:3";
    PFDVars["gsSignal"] = "NAV GS FLAG:3";
    PFDVars["gsError"] = "NAV GLIDE SLOPE ERROR:3";
    PFDVars["ilsIdent"] = "NAV IDENT:3";
    PFDVars["locCourse"] = "L:FLIGHTPLAN_APPROACH_COURSE";
    PFDVars["dmeSignal"] = "NAV HAS DME:3";
    PFDVars["dmeDistance"] = "NAV DME:3";
    PFDVars["afdsStatus"] = "L:77S_AFDS_STATUS";
    PFDVars["autothrottleMode"] = "L:77S_AUTOTHROTTLE_MODE_ACTIVE";
    PFDVars["autothrottleArmed"] = "AUTOPILOT THROTTLE ARM";
    PFDVars["activeRollMode"] = "L:77S_ROLL_MODE_ACTIVE";
    PFDVars["armedRollMode"] = "L:77S_ROLL_MODE_ARMED";
    PFDVars["apOn"] = "AUTOPILOT MASTER";
    PFDVars["activePitchMode"] = "L:77S_PITCH_MODE_ACTIVE";
    PFDVars["armedPitchMode"] = "L:77S_PITCH_MODE_ARMED";
    PFDVars["acceleration"] = "ACCELERATION BODY Z";
})(PFDVars || (PFDVars = {}));
class PFDSimvarPublisher extends SimVarPublisher {
    constructor(bus) {
        super(PFDSimvarPublisher.simvars, bus);
    }
}
PFDSimvarPublisher.simvars = new Map([
    ["pitch", { name: PFDVars.pitch, type: SimVarValueType.Degree }],
    ["roll", { name: PFDVars.roll, type: SimVarValueType.Degree }],
    ["sideslip", { name: PFDVars.sideslip, type: SimVarValueType.Degree }],
    ["altitude", { name: PFDVars.altitude, type: SimVarValueType.Feet }],
    ["airspeed", { name: PFDVars.airspeed, type: SimVarValueType.Knots }],
    ["groundSpeed", { name: PFDVars.groundSpeed, type: SimVarValueType.Knots }],
    ["verticalSpeed", { name: PFDVars.verticalSpeed, type: SimVarValueType.FPM }],
    ["maneuveringSpeed", { name: PFDVars.maneuveringSpeed, type: SimVarValueType.Knots }],
    ["machSpeed", { name: PFDVars.machSpeed, type: SimVarValueType.Number }],
    ["maxSpeed", { name: PFDVars.maxSpeed, type: SimVarValueType.Knots }],
    ["minSpeed", { name: PFDVars.minSpeed, type: SimVarValueType.Knots }],
    ["flapsHandle", { name: PFDVars.flapsHandle, type: SimVarValueType.Number }],
    ["landingFlaps", { name: PFDVars.landingFlaps, type: SimVarValueType.Number }],
    ["takeoffFlaps", { name: PFDVars.takeoffFlaps, type: SimVarValueType.Number }],
    ["actualFlapAngle", { name: PFDVars.actualFlapAngle, type: SimVarValueType.Degree }],
    ["altAboveGround", { name: PFDVars.altAboveGround, type: SimVarValueType.Feet }],
    ["incidenceAlpha", { name: PFDVars.incidenceAlpha, type: SimVarValueType.Degree }],
    ["stallAlpha", { name: PFDVars.stallAlpha, type: SimVarValueType.Degree }],
    ["fdPitch", { name: PFDVars.fdPitch, type: SimVarValueType.Degree }],
    ["fdRoll", { name: PFDVars.fdRoll, type: SimVarValueType.Degree }],
    ["fdOn", { name: PFDVars.fdOn, type: SimVarValueType.Bool }],
    ["irsState", { name: PFDVars.irsState, type: SimVarValueType.Enum }],
    ["verticalVelocity", { name: PFDVars.verticalVelocity, type: SimVarValueType.FPM }],
    ["horizontalVelocity", { name: PFDVars.horizontalVelocity, type: SimVarValueType.FPM }],
    ["trueHeading", { name: PFDVars.trueHeading, type: SimVarValueType.Degree }],
    ["magneticHeading", { name: PFDVars.magneticHeading, type: SimVarValueType.Degree }],
    ["trueTrack", { name: PFDVars.trueTrack, type: SimVarValueType.Degree }],
    ["magneticTrack", { name: PFDVars.magneticTrack, type: SimVarValueType.Degree }],
    ["fpvOn", { name: PFDVars.fpvOn, type: SimVarValueType.Bool }],
    ["markerBeaconState", { name: PFDVars.markerBeaconState, type: SimVarValueType.Enum }],
    ["vsActive", { name: PFDVars.vsActive, type: SimVarValueType.Bool }],
    ["selectedVs", { name: PFDVars.selectedVs, type: SimVarValueType.FPM }],
    ["selectedHeading", { name: PFDVars.selectedHeading, type: SimVarValueType.Degree }],
    ["selectedSpeed", { name: PFDVars.selectedSpeed, type: SimVarValueType.Knots }],
    ["selectedMachSpeed", { name: PFDVars.selectedMachSpeed, type: SimVarValueType.Number }],
    ["selectedAltitude", { name: PFDVars.selectedAltitude, type: SimVarValueType.Feet }],
    ["v1", { name: PFDVars.v1, type: SimVarValueType.Knots }],
    ["vR", { name: PFDVars.vR, type: SimVarValueType.Knots }],
    ["v2", { name: PFDVars.v2, type: SimVarValueType.Knots }],
    ["vRef20", { name: PFDVars.vRef25, type: SimVarValueType.Knots }],
    ["vRef25", { name: PFDVars.vRef25, type: SimVarValueType.Knots }],
    ["vRef30", { name: PFDVars.vRef30, type: SimVarValueType.Knots }],
    ["vRef", { name: PFDVars.vRef, type: SimVarValueType.Knots }],
    ["flightPhase", { name: PFDVars.flightPhase, type: SimVarValueType.Number }],
    ["onGround", { name: PFDVars.onGround, type: SimVarValueType.Bool }],
    ["isInMach", { name: PFDVars.isInMach, type: SimVarValueType.Bool }],
    ["altAlertStatus", { name: PFDVars.altAlertStatus, type: SimVarValueType.Number }],
    ["originElevation", { name: PFDVars.originElevation, type: SimVarValueType.Number }],
    ["destinationElevation", { name: PFDVars.destinationElevation, type: SimVarValueType.Number }],
    ["passedHalfway", { name: PFDVars.passedHalfway, type: SimVarValueType.Bool }],
    ["baroMinimums", { name: PFDVars.baroMinimums, type: SimVarValueType.Feet }],
    ["radioMinimums", { name: PFDVars.radioMinimums, type: SimVarValueType.Feet }],
    ["isMetresOn", { name: PFDVars.isMetresOn, type: SimVarValueType.Bool }],
    ["isStd", { name: PFDVars.isStd, type: SimVarValueType.Bool }],
    ["baroUnits", { name: PFDVars.baroUnits, type: SimVarValueType.Bool }],
    ["baroHg", { name: PFDVars.baroHg, type: SimVarValueType.InHG }],
    ["preselBaroVisible", { name: PFDVars.preselBaroVisible, type: SimVarValueType.Bool }],
    ["preselBaro", { name: PFDVars.preselBaro, type: SimVarValueType.Number }],
    ["inboundLocCourse", { name: PFDVars.inboundLocCourse, type: SimVarValueType.Degree }],
    ["locRadial", { name: PFDVars.locRadial, type: SimVarValueType.Degree }],
    ["locSignal", { name: PFDVars.locSignal, type: SimVarValueType.Bool }],
    ["locFrequency", { name: PFDVars.locFrequency, type: SimVarValueType.MHz }],
    ["gsSignal", { name: PFDVars.gsSignal, type: SimVarValueType.Bool }],
    ["gsError", { name: PFDVars.gsError, type: SimVarValueType.Degree }],
    ["ilsIdent", { name: PFDVars.ilsIdent, type: SimVarValueType.String }],
    ["locCourse", { name: PFDVars.locCourse, type: SimVarValueType.Number }],
    ["dmeSignal", { name: PFDVars.dmeSignal, type: SimVarValueType.Bool }],
    ["dmeDistance", { name: PFDVars.dmeDistance, type: SimVarValueType.NM }],
    ["afdsStatus", { name: PFDVars.afdsStatus, type: SimVarValueType.Enum }],
    ["autothrottleMode", { name: PFDVars.autothrottleMode, type: SimVarValueType.Enum }],
    ["autothrottleArmed", { name: PFDVars.autothrottleArmed, type: SimVarValueType.Bool }],
    ["activeRollMode", { name: PFDVars.activeRollMode, type: SimVarValueType.Enum }],
    ["armedRollMode", { name: PFDVars.armedRollMode, type: SimVarValueType.Enum }],
    ["apOn", { name: PFDVars.apOn, type: SimVarValueType.Bool }],
    ["activePitchMode", { name: PFDVars.activePitchMode, type: SimVarValueType.Enum }],
    ["armedPitchMode", { name: PFDVars.armedPitchMode, type: SimVarValueType.Enum }],
    ["acceleration", { name: PFDVars.acceleration, type: SimVarValueType.FPM }],
]);

/**
 * Copyright (C) 2022 Salty Simulations and its contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */
class PFDInstrument extends BaseInstrument {
    constructor() {
        super();
        this.bus = new EventBus();
        this.simVarPublisher = new PFDSimvarPublisher(this.bus);
        this.hEventPublisher = new HEventPublisher(this.bus);
    }
    get templateID() {
        return "pfd";
    }
    connectedCallback() {
        super.connectedCallback();
        this.simVarPublisher.startPublish();
        this.hEventPublisher.startPublish();
        for (const simvar of PFDSimvarPublisher.simvars.keys()) {
            this.simVarPublisher.subscribe(simvar);
        }
        FSComponent.render(FSComponent.buildComponent(PFD, { bus: this.bus }), document.getElementById("InstrumentContent"));
    }
    onInteractionEvent(args) {
        this.hEventPublisher.dispatchHEvent(args[0]);
    }
    Update() {
        this.simVarPublisher.onUpdate();
    }
}
registerInstrument("salty-pfd", PFDInstrument);