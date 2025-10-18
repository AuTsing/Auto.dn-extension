// deno-lint-ignore-file no-explicit-any

/**
 * @version 0.18.0
 */
declare namespace Autodn {
    /**
     * 点类构造选项。
     *
     * @since v0.18.0
     * @category Js JavaScript
     */
    export interface PointConstructorOptions {
        /**
         * X坐标值。
         *
         * @since v0.18.0
         */
        readonly x?: number;

        /**
         * Y坐标值。
         *
         * @since v0.18.0
         */
        readonly y?: number;

        /**
         * 颜色值。
         *
         * @since v0.18.0
         */
        readonly c?: number;
    }

    /**
     * 点类数据。
     *
     * @since v0.18.0
     * @category Js JavaScript
     */
    export type PointData = [number, number, number];

    /**
     * 点类。
     *
     * @since v0.18.0
     * @category Js JavaScript
     */
    export class Point {
        /**
         * 默认选项。
         *
         * @since v0.18.0
         */
        static readonly defaultOptions: {
            /**
             * 默认X坐标值。
             *
             * @since v0.18.0
             */
            readonly x: number;
            /**
             * 默认Y坐标值。
             *
             * @since v0.18.0
             */
            readonly y: number;
            /**
             * 默认颜色值。
             *
             * @since v0.18.0
             */
            readonly c: number;
        };

        /**
         * 使用默认选项构造 Point 实例。
         *
         * @returns Point 实例
         *
         * @since v0.18.0
         */
        static from(): Point;

        /**
         * 使用点类数据构造 Point 实例。
         *
         * @param xyc - 点类数据
         * @returns Point 实例
         *
         * @since v0.18.0
         */
        static from(xyc: PointData): Point;

        /**
         * 使用点类构造 Point 实例。
         *
         * @param point - 点类的一个实例
         * @returns Point 实例
         *
         * @since v0.18.0
         */
        static from(point: Point): Point;

        /**
         * 使用点类构造选项构造 Point 实例。
         *
         * @param options - 点类构造选项
         * @returns Point 实例
         *
         * @since v0.18.0
         */
        static from(options: PointConstructorOptions): Point;

        /**
         * 使用数值构造 Point 实例。
         *
         * @param x - X坐标值
         * @param y - Y坐标值
         * @param c - 颜色值
         * @returns Point 实例
         *
         * @since v0.18.0
         */
        static from(x: number | null, y: number | null, c: number | null): Point;

        /**
         * 判断一个值是否为合法的点类数据。
         *
         * @param value - 任意类型的值
         * @returns 是否为合法的点类数据
         *
         * @since v0.18.0
         */
        static isPointData(value: any): boolean;

        /**
         * X坐标值。
         *
         * @since v0.18.0
         */
        readonly x: number;

        /**
         * Y坐标值。
         *
         * @since v0.18.0
         */
        readonly y: number;

        /**
         * 颜色值。
         *
         * @since v0.18.0
         */
        readonly c: number;

        /**
         * @param x - X坐标值
         * @param y - Y坐标值
         * @param c - 颜色值
         *
         * @since v0.18.0
         */
        constructor(x: number, y: number, c: number);

        /**
         * 获取点类数据。
         *
         * @returns 点类数据
         *
         * @since v0.18.0
         */
        toXyc(): PointData;

        /**
         * 获取 Uint32Array 包装的取点类数据。
         *
         * @returns Uint32Array 包装的点类数据
         *
         * @since v0.18.0
         */
        toUint32Array(): Uint32Array;
    }

    /**
     * 可转换为 Point 的数据类型。
     *
     * @since v0.18.0
     * @category Js JavaScript
     */
    export type IntoPoint = PointData | Point | PointConstructorOptions;

    /**
     * 矩形类构造选项。
     *
     * @since v0.18.0
     * @category Js JavaScript
     */
    export interface RectConstructorOptions {
        /**
         * 左值。
         *
         * @since v0.18.0
         */
        readonly left?: number;

        /**
         * 上值。
         *
         * @since v0.18.0
         */
        readonly top?: number;

        /**
         * 右值。
         *
         * @since v0.18.0
         */
        readonly right?: number;

        /**
         * 下值。
         *
         * @since v0.18.0
         */
        readonly bottom?: number;
    }

    /**
     * 矩形类数据。
     *
     * @since v0.18.0
     * @category Js JavaScript
     */
    export type RectData = [number, number, number, number];

    /**
     * 矩形类。
     *
     * @since v0.18.0
     * @category Js JavaScript
     */
    export class Rect {
        /**
         * 默认选项。
         *
         * @since v0.18.0
         */
        static readonly defaultOptions: {
            /**
             * 默认左值。
             *
             * @since v0.18.0
             */
            readonly left: number;

            /**
             * 默认上值。
             *
             * @since v0.18.0
             */
            readonly top: number;

            /**
             * 默认右值。
             *
             * @since v0.18.0
             */
            readonly right: number;

            /**
             * 默认下值。
             *
             * @since v0.18.0
             */
            readonly bottom: number;
        };

        /**
         * 使用默认选项构造 Rect 实例。
         *
         * @returns Rect 实例
         *
         * @since v0.18.0
         */
        static from(): Rect;

        /**
         * 使用矩形类数据构造 Rect 实例。
         *
         * @param ltrb - 矩形类数据
         * @returns Rect 实例
         *
         * @since v0.18.0
         */
        static from(ltrb: RectData): Rect;

        /**
         * 使用矩形类构造 Rect 实例。
         *
         * @param rect - 矩形类的一个实例
         * @returns Rect 实例
         *
         * @since v0.18.0
         */
        static from(rect: Rect): Rect;

        /**
         * 使用矩形类构造选项构造 Rect 实例。
         *
         * @param options - 矩形类构造选项
         * @returns Rect 实例
         *
         * @since v0.18.0
         */
        static from(options: RectConstructorOptions): Rect;

        /**
         * 使用数值构造 Rect 实例。
         *
         * @param left - 左值
         * @param top - 上值
         * @param right - 右值
         * @param bottom - 下值
         * @returns Rect 实例
         *
         * @since v0.18.0
         */
        static from(left: number | null, top: number | null, right: number | null, bottom: number | null): Rect;

        /**
         * 判断一个值是否为合法的矩形类数据。
         *
         * @param value - 任意类型的值
         * @returns 是否为合法的矩形类数据
         *
         * @since v0.18.0
         */
        static isRectData(value: any): boolean;

        /**
         * 左值。
         *
         * @since v0.18.0
         */
        readonly left: number;

        /**
         * 上值。
         *
         * @since v0.18.0
         */
        readonly top: number;

        /**
         * 右值。
         *
         * @since v0.18.0
         */
        readonly right: number;

        /**
         * 下值。
         *
         * @since v0.18.0
         */
        readonly bottom: number;

        /**
         * @param left - 左值
         * @param top - 上值
         * @param right - 右值
         * @param bottom - 下值
         *
         * @since v0.18.0
         */
        constructor(left: number, top: number, right: number, bottom: number);

        /**
         * 获取矩形类数据。
         *
         * @returns 矩形类数据
         *
         * @since v0.18.0
         */
        toLtrb(): RectData;

        /**
         * 获取 Uint32Array 包装的取矩形类数据。
         *
         * @returns Uint32Array 包装的取矩形类数据
         *
         * @since v0.18.0
         */
        toUint32Array(): Uint32Array;
    }

    /**
     * 可转换为 Rect 的数据类型。
     *
     * @since v0.18.0
     * @category Js JavaScript
     */
    export type IntoRect = RectData | Rect | RectConstructorOptions;

    /**
     * UI 对象类。
     *
     * @since v0.18.0
     * @category Accessibility 无障碍
     */
    export class UiObject {
        private constructor();

        /**
         * 获取 UI 对象的父对象。
         *
         * @returns UI 对象 或 空值
         *
         * @since v0.18.0
         */
        getParent(): UiObject | null;

        /**
         * 获取 UI 对象的子对象。
         *
         * @param i - 子对象索引
         * @returns UI 对象 或 空值
         *
         * @since v0.18.0
         */
        getChild(i: number): UiObject | null;

        /**
         * 获取 UI 对象属性 id 的值。
         *
         * @returns 属性 id
         *
         * @since v0.18.0
         */
        getId(): string;

        /**
         * 获取 UI 对象属性 desc 的值。
         *
         * @returns 属性 desc
         *
         * @since v0.18.0
         */
        getDesc(): string;

        /**
         * 获取 UI 对象属性 className 的值。
         *
         * @returns 属性 className
         *
         * @since v0.18.0
         */
        getClassName(): string;

        /**
         * 获取 UI 对象属性 packageName 的值。
         *
         * @returns 属性 packageName
         *
         * @since v0.18.0
         */
        getPackageName(): string;

        /**
         * 获取 UI 对象属性 text 的值。
         *
         * @returns 属性 text
         *
         * @since v0.18.0
         */
        getText(): string;

        /**
         * 获取 UI 对象属性 originId 的值。
         *
         * @returns 属性 originId
         *
         * @since v0.18.0
         */
        getOriginId(): number;

        /**
         * 获取 UI 对象属性 originId 的值。
         *
         * @returns 属性 originId
         *
         * @since v0.18.0
         */
        getDepth(): number;

        /**
         * 获取 UI 对象属性 indexInParent 的值。
         *
         * @returns 属性 indexInParent
         *
         * @since v0.18.0
         */
        getIndexInParent(): number;

        /**
         * 获取 UI 对象属性 drawingOrder 的值。
         *
         * @returns 属性 drawingOrder
         *
         * @since v0.18.0
         */
        getDrawingOrder(): number;

        /**
         * 获取 UI 对象属性 row 的值。
         *
         * @returns 属性 row
         *
         * @since v0.18.0
         */
        getRow(): number;

        /**
         * 获取 UI 对象属性 rowSpan 的值。
         *
         * @returns 属性 rowSpan
         *
         * @since v0.18.0
         */
        getRowSpan(): number;

        /**
         * 获取 UI 对象属性 rowCount 的值。
         *
         * @returns 属性 rowCount
         *
         * @since v0.18.0
         */
        getRowCount(): number;

        /**
         * 获取 UI 对象属性 column 的值。
         *
         * @returns 属性 column
         *
         * @since v0.18.0
         */
        getColumn(): number;

        /**
         * 获取 UI 对象属性 columnSpan 的值。
         *
         * @returns 属性 columnSpan
         *
         * @since v0.18.0
         */
        getColumnSpan(): number;

        /**
         * 获取 UI 对象属性 columnCount 的值。
         *
         * @returns 属性 columnCount
         *
         * @since v0.18.0
         */
        getColumnCount(): number;

        /**
         * 获取 UI 对象属性 accessibilityFocused 的值。
         *
         * @returns 属性 accessibilityFocused
         *
         * @since v0.18.0
         */
        getAccessibilityFocused(): boolean;

        /**
         * 获取 UI 对象属性 checked 的值。
         *
         * @returns 属性 checked
         *
         * @since v0.18.0
         */
        getChecked(): boolean;

        /**
         * 获取 UI 对象属性 checkable 的值。
         *
         * @returns 属性 checkable
         *
         * @since v0.18.0
         */
        getCheckable(): boolean;

        /**
         * 获取 UI 对象属性 clickable 的值。
         *
         * @returns 属性 clickable
         *
         * @since v0.18.0
         */
        getClickable(): boolean;

        /**
         * 获取 UI 对象属性 contextClickable 的值。
         *
         * @returns 属性 contextClickable
         *
         * @since v0.18.0
         */
        getContextClickable(): boolean;

        /**
         * 获取 UI 对象属性 dismissable 的值。
         *
         * @returns 属性 dismissable
         *
         * @since v0.18.0
         */
        getDismissable(): boolean;

        /**
         * 获取 UI 对象属性 enabled 的值。
         *
         * @returns 属性 enabled
         *
         * @since v0.18.0
         */
        getEnabled(): boolean;

        /**
         * 获取 UI 对象属性 editable 的值。
         *
         * @returns 属性 editable
         *
         * @since v0.18.0
         */
        getEditable(): boolean;

        /**
         * 获取 UI 对象属性 focusable 的值。
         *
         * @returns 属性 focusable
         *
         * @since v0.18.0
         */
        getFocusable(): boolean;

        /**
         * 获取 UI 对象属性 focused 的值。
         *
         * @returns 属性 focused
         *
         * @since v0.18.0
         */
        getFocused(): boolean;

        /**
         * 获取 UI 对象属性 longClickable 的值。
         *
         * @returns 属性 longClickable
         *
         * @since v0.18.0
         */
        getLongClickable(): boolean;

        /**
         * 获取 UI 对象属性 selected 的值。
         *
         * @returns 属性 selected
         *
         * @since v0.18.0
         */
        getSelected(): boolean;

        /**
         * 获取 UI 对象属性 scrollable 的值。
         *
         * @returns 属性 scrollable
         *
         * @since v0.18.0
         */
        getScrollable(): boolean;

        /**
         * 获取 UI 对象属性 visibleToUser 的值。
         *
         * @returns 属性 visibleToUser
         *
         * @since v0.18.0
         */
        getVisibleToUser(): boolean;

        /**
         * 获取 UI 对象属性 password 的值。
         *
         * @returns 属性 password
         *
         * @since v0.18.0
         */
        getPassword(): boolean;

        /**
         * 获取 UI 对象属性 contentInvalid 的值。
         *
         * @returns 属性 contentInvalid
         *
         * @since v0.18.0
         */
        getContentInvalid(): boolean;

        /**
         * 获取 UI 对象属性 multiLine 的值。
         *
         * @returns 属性 multiLine
         *
         * @since v0.18.0
         */
        getMultiLine(): boolean;

        /**
         * 获取 UI 对象在屏幕中的矩形类。
         *
         * @returns 矩形类
         *
         * @since v0.18.0
         */
        getBoundsInScreen(): Rect;

        /**
         * 获取 UI 对象子对象的数量。
         *
         * @returns 子对象的数量
         *
         * @since v0.18.0
         */
        getChildCount(): number;

        /**
         * 获取 UI 对象的子对象。
         *
         * @returns 子对象集合
         *
         * @since v0.18.0
         */
        getChildren(): UiObject[];

        /**
         * 递归获取 UI 对象的子对象。
         *
         * @returns 子对象集合
         *
         * @since v0.18.0
         */
        getAllChildren(): UiObject[];

        /**
         * 对 UI 对象执行点击操作。
         *
         * @since v0.18.0
         */
        click(): void;

        /**
         * 对 UI 对象执行长按操作。
         *
         * @since v0.18.0
         */
        longClick(): void;

        /**
         * 对 UI 对象转移无障碍焦点。
         *
         * @since v0.18.0
         */
        accessibilityFocus(): void;

        /**
         * 清除对 UI 对象的无障碍焦点。
         *
         * @since v0.18.0
         */
        clearAccessibilityFocus(): void;

        /**
         * 对 UI 对象转移焦点。
         *
         * @since v0.18.0
         */
        focus(): void;

        /**
         * 清除对 UI 对象的焦点。
         *
         * @since v0.18.0
         */
        clearFocus(): void;

        /**
         * 对 UI 对象执行复制。
         *
         * @since v0.18.0
         */
        copy(): void;

        /**
         * 对 UI 对象执行粘贴。
         *
         * @since v0.18.0
         */
        paste(): void;

        /**
         * 对 UI 对象执行选择。
         *
         * @since v0.18.0
         */
        select(): void;

        /**
         * 对 UI 对象执行剪切。
         *
         * @since v0.18.0
         */
        cut(): void;

        /**
         * 对 UI 对象执行收缩。
         *
         * @since v0.18.0
         */
        collapse(): void;

        /**
         * 对 UI 对象执行展开。
         *
         * @since v0.18.0
         */
        expand(): void;

        /**
         * 对 UI 对象执行消除。
         *
         * @since v0.18.0
         */
        dismiss(): void;

        /**
         * 对 UI 对象执行展示。
         *
         * @since v0.18.0
         */
        showOnScreen(): void;

        /**
         * 对 UI 对象执行向前滚动。
         *
         * @since v0.18.0
         */
        scrollForward(): void;

        /**
         * 对 UI 对象执行向后滚动。
         *
         * @since v0.18.0
         */
        scrollBackward(): void;

        /**
         * 对 UI 对象执行向上滚动。
         *
         * @since v0.18.0
         */
        scrollUp(): void;

        /**
         * 对 UI 对象执行向上滚动。
         *
         * @since v0.18.0
         */
        scrollDown(): void;

        /**
         * 对 UI 对象执行向左滚动。
         *
         * @since v0.18.0
         */
        scrollLeft(): void;

        /**
         * 对 UI 对象执行向右滚动。
         *
         * @since v0.18.0
         */
        scrollRight(): void;

        /**
         * 对 UI 对象执行上下文点击。
         *
         * @since v0.18.0
         */
        contextClick(): void;

        /**
         * 对 UI 对象执行设置选择范围。
         *
         * @param start - 开始索引
         * @param end - 结束索引
         *
         * @since v0.18.0
         */
        setSelection(start: number, end: number): void;

        /**
         * 对 UI 对象执行设置文本。
         *
         * @param text - 要设置的文本
         *
         * @since v0.18.0
         */
        setText(text: string): void;

        /**
         * 对 UI 对象执行设置进度。
         *
         * @param value - 要设置的进度数值
         *
         * @since v0.18.0
         */
        setProgress(value: number): void;

        /**
         * 对 UI 对象执行滚动到指定行列。
         *
         * @param row - 要滚动到的行
         * @param column - 要滚动到的列
         *
         * @since v0.18.0
         */
        scrollTo(row: number, column: number): void;
    }

    /**
     * UI 选择器。
     *
     * @since v0.18.0
     * @category Accessibility 无障碍
     */
    export class UiSelector {
        /**
         * 获得 UI 选择器构造器。
         *
         * @returns UI 选择器构造器
         *
         * @since v0.18.0
         */
        static builder(): UiSelectorBuilder;

        private constructor();

        /**
         * 使用选择器查找 UI 对象。
         *
         * @returns UI 对象集合
         *
         * @since v0.18.0
         */
        find(): UiObject[];

        /**
         * 使用选择器查找一个 UI 对象。
         *
         * @returns UI 对象 或 空值
         *
         * @since v0.18.0
         */
        findOne(): UiObject | null;

        /**
         * 使用选择器一直查找知道找到 UI 对象。
         *
         * @returns UI 对象集合
         *
         * @since v0.18.0
         */
        untilFind(): Promise<UiObject[]>;

        /**
         * 使用选择器查找 UI 对象直到超时。
         *
         * @param timeout - 超时时间(毫秒)
         * @returns UI 对象集合
         *
         * @since v0.18.0
         */
        untilFind(timeout: number): Promise<UiObject[]>;

        /**
         * 使用选择器一直查找知道找到一个 UI 对象。
         *
         * @returns UI 对象
         *
         * @since v0.18.0
         */
        untilFindOne(): Promise<UiObject>;

        /**
         * 使用选择器查找一个 UI 对象直到超时。
         *
         * @param timeout - 超时时间(毫秒)
         * @returns UI 对象
         *
         * @since v0.18.0
         */
        untilFindOne(timeout: number): Promise<UiObject>;

        /**
         * 判断选择器的 UI 对象是否存在。
         *
         * @returns 是否存在
         *
         * @since v0.18.0
         */
        exists(): boolean;

        /**
         * 使用选择器等待查找 UI 对象。
         *
         * @since v0.18.0
         */
        wait(): Promise<void>;

        /**
         * 使用选择器等待查找 UI 对象直到超时。
         *
         * @param timeout - 超时时间(毫秒)
         *
         * @since v0.18.0
         */
        wait(timeout: number): Promise<void>;
    }

    /**
     * UI 选择器构造器。
     *
     * @since v0.18.0
     * @category Accessibility 无障碍
     */
    export class UiSelectorBuilder {
        private constructor();

        /**
         * 添加过滤器，条件为其 id 等于 指定 id。
         *
         * @param id - 指定 id
         * @returns UI 选择器构造器自身
         *
         * @since v0.18.0
         */
        id(id: string): UiSelectorBuilder;

        /**
         * 添加过滤器，条件为其 id 等于 指定 id。
         *
         * @param id - 指定 id
         * @returns UI 选择器构造器自身
         *
         * @since v0.18.0
         */
        idEquals(id: string): UiSelectorBuilder;

        /**
         * 添加过滤器，条件为其 id 包含指定文本。
         *
         * @param content - 指定文本
         * @returns UI 选择器构造器自身
         *
         * @since v0.18.0
         */
        idContains(content: string): UiSelectorBuilder;

        /**
         * 添加过滤器，条件为其 id 符合指定正则表达式。
         *
         * @param regex - 正则表达式文本
         * @returns UI 选择器构造器自身
         *
         * @since v0.18.0
         */
        idMatches(regex: string): UiSelectorBuilder;

        /**
         * 添加过滤器，条件为其 id 符合以指定文本开头。
         *
         * @param prefix - 指定文本
         * @returns UI 选择器构造器自身
         *
         * @since v0.18.0
         */
        idStartsWith(prefix: string): UiSelectorBuilder;

        /**
         * 添加过滤器，条件为其 id 符合以指定文本结尾。
         *
         * @param suffix - 指定文本
         * @returns UI 选择器构造器自身
         *
         * @since v0.18.0
         */
        idEndsWith(suffix: string): UiSelectorBuilder;

        /**
         * 添加过滤器，条件为其 文本 等于 指定文本。
         *
         * @param text - 指定文本
         * @returns UI 选择器构造器自身
         *
         * @since v0.18.0
         */
        text(text: string): UiSelectorBuilder;

        /**
         * 添加过滤器，条件为其 文本 等于 指定文本。
         *
         * @param id - 指定文本
         * @returns UI 选择器构造器自身
         *
         * @since v0.18.0
         */
        textEquals(text: string): UiSelectorBuilder;

        /**
         * 添加过滤器，条件为其 文本 包含 指定文本。
         *
         * @param content - 指定文本
         * @returns UI 选择器构造器自身
         *
         * @since v0.18.0
         */
        textContains(content: string): UiSelectorBuilder;

        /**
         * 添加过滤器，条件为其 文本 符合指定正则表达式。
         *
         * @param regex - 正则表达式文本
         * @returns UI 选择器构造器自身
         *
         * @since v0.18.0
         */
        textMatches(regex: string): UiSelectorBuilder;

        /**
         * 添加过滤器，条件为其 文本 符合以指定文本开头。
         *
         * @param prefix - 指定文本
         * @returns UI 选择器构造器自身
         *
         * @since v0.18.0
         */
        textStartsWith(prefix: string): UiSelectorBuilder;

        /**
         * 添加过滤器，条件为其 文本 符合以指定文本结尾。
         *
         * @param suffix - 指定文本
         * @returns UI 选择器构造器自身
         *
         * @since v0.18.0
         */
        textEndsWith(suffix: string): UiSelectorBuilder;

        /**
         * 添加过滤器，条件为其 描述 等于 指定描述。
         *
         * @param desc - 指定描述
         * @returns UI 选择器构造器自身
         *
         * @since v0.18.0
         */
        desc(desc: string): UiSelectorBuilder;

        /**
         * 添加过滤器，条件为其 描述 等于 指定描述。
         *
         * @param desc - 指定描述
         * @returns UI 选择器构造器自身
         *
         * @since v0.18.0
         */
        descEquals(desc: string): UiSelectorBuilder;

        /**
         * 添加过滤器，条件为其 描述 包含 指定文本。
         *
         * @param content - 指定文本
         * @returns UI 选择器构造器自身
         *
         * @since v0.18.0
         */
        descContains(content: string): UiSelectorBuilder;

        /**
         * 添加过滤器，条件为其 描述 符合指定正则表达式。
         *
         * @param regex - 正则表达式文本
         * @returns UI 选择器构造器自身
         *
         * @since v0.18.0
         */
        descMatches(regex: string): UiSelectorBuilder;

        /**
         * 添加过滤器，条件为其 描述 符合以指定文本开头。
         *
         * @param prefix - 指定文本
         * @returns UI 选择器构造器自身
         *
         * @since v0.18.0
         */
        descStartsWith(prefix: string): UiSelectorBuilder;

        /**
         * 添加过滤器，条件为其 类名 符合以指定文本结尾。
         *
         * @param suffix - 指定文本
         * @returns UI 选择器构造器自身
         *
         * @since v0.18.0
         */
        descEndsWith(suffix: string): UiSelectorBuilder;

        /**
         * 添加过滤器，条件为其 类名 等于 指定类名。
         *
         * @param className - 指定类名
         * @returns UI 选择器构造器自身
         *
         * @since v0.18.0
         */
        className(className: string): UiSelectorBuilder;

        /**
         * 添加过滤器，条件为其 描述 等于 指定类名。
         *
         * @param className - 指定类名
         * @returns UI 选择器构造器自身
         *
         * @since v0.18.0
         */
        classNameEquals(className: string): UiSelectorBuilder;

        /**
         * 添加过滤器，条件为其 类名 包含 指定文本。
         *
         * @param content - 指定文本
         * @returns UI 选择器构造器自身
         *
         * @since v0.18.0
         */
        classNameContains(content: string): UiSelectorBuilder;

        /**
         * 添加过滤器，条件为其 类名 符合指定正则表达式。
         *
         * @param regex - 正则表达式文本
         * @returns UI 选择器构造器自身
         *
         * @since v0.18.0
         */
        classNameMatches(regex: string): UiSelectorBuilder;

        /**
         * 添加过滤器，条件为其 类名 符合以指定文本开头。
         *
         * @param prefix - 指定文本
         * @returns UI 选择器构造器自身
         *
         * @since v0.18.0
         */
        classNameStartsWith(prefix: string): UiSelectorBuilder;

        /**
         * 添加过滤器，条件为其 类名 符合以指定文本结尾。
         *
         * @param suffix - 指定文本
         * @returns UI 选择器构造器自身
         *
         * @since v0.18.0
         */
        classNameEndsWith(suffix: string): UiSelectorBuilder;

        /**
         * 添加过滤器，条件为其 包名 等于 指定包名。
         *
         * @param packageName - 指定包名
         * @returns UI 选择器构造器自身
         *
         * @since v0.18.0
         */
        packageName(packageName: string): UiSelectorBuilder;

        /**
         * 添加过滤器，条件为其 包名 等于 指定包名。
         *
         * @param packageName - 指定包名
         * @returns UI 选择器构造器自身
         *
         * @since v0.18.0
         */
        packageNameEquals(packageName: string): UiSelectorBuilder;

        /**
         * 添加过滤器，条件为其 包名 包含 指定文本。
         *
         * @param content - 指定文本
         * @returns UI 选择器构造器自身
         *
         * @since v0.18.0
         */
        packageNameContains(content: string): UiSelectorBuilder;

        /**
         * 添加过滤器，条件为其 包名 符合指定正则表达式。
         *
         * @param regex - 正则表达式文本
         * @returns UI 选择器构造器自身
         *
         * @since v0.18.0
         */
        packageNameMatches(regex: string): UiSelectorBuilder;

        /**
         * 添加过滤器，条件为其 包名 符合以指定文本开头。
         *
         * @param prefix - 指定文本
         * @returns UI 选择器构造器自身
         *
         * @since v0.18.0
         */
        packageNameStartsWith(prefix: string): UiSelectorBuilder;

        /**
         * 添加过滤器，条件为其 包名 符合以指定文本结尾。
         *
         * @param suffix - 指定文本
         * @returns UI 选择器构造器自身
         *
         * @since v0.18.0
         */
        packageNameEndsWith(suffix: string): UiSelectorBuilder;

        /**
         * 添加过滤器，条件为其 矩形 等于 指定矩形。
         *
         * @param ltrb - 指定矩形的矩形类数据
         * @returns UI 选择器构造器自身
         *
         * @since v0.18.0
         */
        bounds(ltrb: RectData): UiSelectorBuilder;

        /**
         * 添加过滤器，条件为其 矩形 等于 指定矩形。
         *
         * @param rect - 指定矩形
         * @returns UI 选择器构造器自身
         *
         * @since v0.18.0
         */
        bounds(rect: Rect): UiSelectorBuilder;

        /**
         * 添加过滤器，条件为其 矩形 等于 指定矩形。
         *
         * @param options - 指定矩形的构造选项
         * @returns UI 选择器构造器自身
         *
         * @since v0.18.0
         */
        bounds(options: RectConstructorOptions): UiSelectorBuilder;

        /**
         * 添加过滤器，条件为其 矩形 等于 指定矩形。
         *
         * @param left - 指定矩形的左值
         * @param top - 指定矩形的上值
         * @param right - 指定矩形的右值
         * @param bottom - 指定矩形的下值
         * @returns UI 选择器构造器自身
         *
         * @since v0.18.0
         */
        bounds(left: number, top: number, right: number, bottom: number): UiSelectorBuilder;

        /**
         * 添加过滤器，条件为其 矩形 等于 指定矩形。
         *
         * @param ltrb - 指定矩形的矩形类数据
         * @returns UI 选择器构造器自身
         *
         * @since v0.18.0
         */
        boundsEquals(ltrb: RectData): UiSelectorBuilder;

        /**
         * 添加过滤器，条件为其 矩形 等于 指定矩形。
         *
         * @param rect - 指定矩形
         * @returns UI 选择器构造器自身
         *
         * @since v0.18.0
         */
        boundsEquals(rect: Rect): UiSelectorBuilder;

        /**
         * 添加过滤器，条件为其 矩形 等于 指定矩形。
         *
         * @param options - 指定矩形的构造选项
         * @returns UI 选择器构造器自身
         *
         * @since v0.18.0
         */
        boundsEquals(options: RectConstructorOptions): UiSelectorBuilder;

        /**
         * 添加过滤器，条件为其 矩形 等于 指定矩形。
         *
         * @param left - 指定矩形的左值
         * @param top - 指定矩形的上值
         * @param right - 指定矩形的右值
         * @param bottom - 指定矩形的下值
         * @returns UI 选择器构造器自身
         *
         * @since v0.18.0
         */
        boundsEquals(left: number, top: number, right: number, bottom: number): UiSelectorBuilder;

        /**
         * 添加过滤器，条件为其 矩形 被包含在指定矩形中。
         *
         * @param ltrb - 指定矩形的矩形类数据
         * @returns UI 选择器构造器自身
         *
         * @since v0.18.0
         */
        boundsInside(ltrb: RectData): UiSelectorBuilder;

        /**
         * 添加过滤器，条件为其 矩形 被包含在指定矩形中。
         *
         * @param rect - 指定矩形
         * @returns UI 选择器构造器自身
         *
         * @since v0.18.0
         */
        boundsInside(rect: Rect): UiSelectorBuilder;

        /**
         * 添加过滤器，条件为其 矩形 被包含在指定矩形中。
         *
         * @param options - 指定矩形的构造选项
         * @returns UI 选择器构造器自身
         *
         * @since v0.18.0
         */
        boundsInside(options: RectConstructorOptions): UiSelectorBuilder;

        /**
         * 添加过滤器，条件为其 矩形 被包含在指定矩形中。
         *
         * @param left - 指定矩形的左值
         * @param top - 指定矩形的上值
         * @param right - 指定矩形的右值
         * @param bottom - 指定矩形的下值
         * @returns UI 选择器构造器自身
         *
         * @since v0.18.0
         */
        boundsInside(left: number, top: number, right: number, bottom: number): UiSelectorBuilder;

        /**
         * 添加过滤器，条件为其 矩形 包含指定矩形。
         *
         * @param ltrb - 指定矩形的矩形类数据
         * @returns UI 选择器构造器自身
         *
         * @since v0.18.0
         */
        boundsContains(ltrb: RectData): UiSelectorBuilder;

        /**
         * 添加过滤器，条件为其 矩形 包含指定矩形。
         *
         * @param rect - 指定矩形
         * @returns UI 选择器构造器自身
         *
         * @since v0.18.0
         */
        boundsContains(rect: Rect): UiSelectorBuilder;

        /**
         * 添加过滤器，条件为其 矩形 包含指定矩形。
         *
         * @param options - 指定矩形的构造选项
         * @returns UI 选择器构造器自身
         *
         * @since v0.18.0
         */
        boundsContains(options: RectConstructorOptions): UiSelectorBuilder;

        /**
         * 添加过滤器，条件为其 矩形 包含指定矩形。
         *
         * @param left - 指定矩形的左值
         * @param top - 指定矩形的上值
         * @param right - 指定矩形的右值
         * @param bottom - 指定矩形的下值
         * @returns UI 选择器构造器自身
         *
         * @since v0.18.0
         */
        boundsContains(left: number, top: number, right: number, bottom: number): UiSelectorBuilder;

        /**
         * 添加过滤器，条件为可选中属性为真。
         *
         * @returns UI 选择器构造器自身
         *
         * @since v0.18.0
         */
        checkable(): UiSelectorBuilder;

        /**
         * 添加过滤器，条件为可选中属性为指定值。
         *
         * @param value - 指定值
         * @returns UI 选择器构造器自身
         *
         * @since v0.18.0
         */
        checkable(value: boolean): UiSelectorBuilder;

        /**
         * 添加过滤器，条件为已选中属性为真。
         *
         * @returns UI 选择器构造器自身
         *
         * @since v0.18.0
         */
        checked(): UiSelectorBuilder;

        /**
         * 添加过滤器，条件为已选中属性为指定值。
         *
         * @param value - 指定值
         * @returns UI 选择器构造器自身
         *
         * @since v0.18.0
         */
        checked(value: boolean): UiSelectorBuilder;

        /**
         * 添加过滤器，条件为可聚焦属性为真。
         *
         * @returns UI 选择器构造器自身
         *
         * @since v0.18.0
         */
        focusable(): UiSelectorBuilder;

        /**
         * 添加过滤器，条件为可聚焦属性为指定值。
         *
         * @param value - 指定值
         * @returns UI 选择器构造器自身
         *
         * @since v0.18.0
         */
        focusable(value: boolean): UiSelectorBuilder;

        /**
         * 添加过滤器，条件为已聚焦属性为真。
         *
         * @returns UI 选择器构造器自身
         *
         * @since v0.18.0
         */
        focused(): UiSelectorBuilder;

        /**
         * 添加过滤器，条件为已聚焦属性为指定值。
         *
         * @param value - 指定值
         * @returns UI 选择器构造器自身
         *
         * @since v0.18.0
         */
        focused(value: boolean): UiSelectorBuilder;

        /**
         * 添加过滤器，条件为用户可见属性为真。
         *
         * @returns UI 选择器构造器自身
         *
         * @since v0.18.0
         */
        visibleToUser(): UiSelectorBuilder;

        /**
         * 添加过滤器，条件为用户可见属性为指定值。
         *
         * @param value - 指定值
         * @returns UI 选择器构造器自身
         *
         * @since v0.18.0
         */
        visibleToUser(value: boolean): UiSelectorBuilder;

        /**
         * 添加过滤器，条件为无障碍已聚焦属性为真。
         *
         * @returns UI 选择器构造器自身
         *
         * @since v0.18.0
         */
        accessibilityFocused(): UiSelectorBuilder;

        /**
         * 添加过滤器，条件为无障碍已聚焦属性为指定值。
         *
         * @param value - 指定值
         * @returns UI 选择器构造器自身
         *
         * @since v0.18.0
         */
        accessibilityFocused(value: boolean): UiSelectorBuilder;

        /**
         * 添加过滤器，条件为已选择属性为真。
         *
         * @returns UI 选择器构造器自身
         *
         * @since v0.18.0
         */
        selected(): UiSelectorBuilder;

        /**
         * 添加过滤器，条件为已选择属性为指定值。
         *
         * @param value - 指定值
         * @returns UI 选择器构造器自身
         *
         * @since v0.18.0
         */
        selected(value: boolean): UiSelectorBuilder;

        /**
         * 添加过滤器，条件为可点击属性为真。
         *
         * @returns UI 选择器构造器自身
         *
         * @since v0.18.0
         */
        clickable(): UiSelectorBuilder;

        /**
         * 添加过滤器，条件为可点击属性为指定值。
         *
         * @param value - 指定值
         * @returns UI 选择器构造器自身
         *
         * @since v0.18.0
         */
        clickable(value: boolean): UiSelectorBuilder;

        /**
         * 添加过滤器，条件为可长按属性为真。
         *
         * @returns UI 选择器构造器自身
         *
         * @since v0.18.0
         */
        longClickable(): UiSelectorBuilder;

        /**
         * 添加过滤器，条件为可长按属性为指定值。
         *
         * @param value - 指定值
         * @returns UI 选择器构造器自身
         *
         * @since v0.18.0
         */
        longClickable(value: boolean): UiSelectorBuilder;

        /**
         * 添加过滤器，条件为已启用属性为真。
         *
         * @returns UI 选择器构造器自身
         *
         * @since v0.18.0
         */
        enabled(): UiSelectorBuilder;

        /**
         * 添加过滤器，条件为已启用属性为指定值。
         *
         * @param value - 指定值
         * @returns UI 选择器构造器自身
         *
         * @since v0.18.0
         */
        enabled(value: boolean): UiSelectorBuilder;

        /**
         * 添加过滤器，条件为密码属性为真。
         *
         * @returns UI 选择器构造器自身
         *
         * @since v0.18.0
         */
        password(): UiSelectorBuilder;

        /**
         * 添加过滤器，条件为密码属性为指定值。
         *
         * @param value - 指定值
         * @returns UI 选择器构造器自身
         *
         * @since v0.18.0
         */
        password(value: boolean): UiSelectorBuilder;

        /**
         * 添加过滤器，条件为可滚动属性为真。
         *
         * @returns UI 选择器构造器自身
         *
         * @since v0.18.0
         */
        scrollable(): UiSelectorBuilder;

        /**
         * 添加过滤器，条件为可滚动属性为指定值。
         *
         * @param value - 指定值
         * @returns UI 选择器构造器自身
         *
         * @since v0.18.0
         */
        scrollable(value: boolean): UiSelectorBuilder;

        /**
         * 添加过滤器，条件为可编辑属性为真。
         *
         * @returns UI 选择器构造器自身
         *
         * @since v0.18.0
         */
        editable(): UiSelectorBuilder;

        /**
         * 添加过滤器，条件为可编辑属性为指定值。
         *
         * @param value - 指定值
         * @returns UI 选择器构造器自身
         *
         * @since v0.18.0
         */
        editable(value: boolean): UiSelectorBuilder;

        /**
         * 添加过滤器，条件为内容无效属性为真。
         *
         * @returns UI 选择器构造器自身
         *
         * @since v0.18.0
         */
        contentInvalid(): UiSelectorBuilder;

        /**
         * 添加过滤器，条件为内容无效属性为指定值。
         *
         * @param value - 指定值
         * @returns UI 选择器构造器自身
         *
         * @since v0.18.0
         */
        contentInvalid(value: boolean): UiSelectorBuilder;

        /**
         * 添加过滤器，条件为上下文可点击属性为真。
         *
         * @returns UI 选择器构造器自身
         *
         * @since v0.18.0
         */
        contextClickable(): UiSelectorBuilder;

        /**
         * 添加过滤器，条件为上下文可点击属性为指定值。
         *
         * @param value - 指定值
         * @returns UI 选择器构造器自身
         *
         * @since v0.18.0
         */
        contextClickable(value: boolean): UiSelectorBuilder;

        /**
         * 添加过滤器，条件为多行属性为真。
         *
         * @returns UI 选择器构造器自身
         *
         * @since v0.18.0
         */
        multiLine(): UiSelectorBuilder;

        /**
         * 添加过滤器，条件为多行属性为指定值。
         *
         * @param value - 指定值
         * @returns UI 选择器构造器自身
         *
         * @since v0.18.0
         */
        multiLine(value: boolean): UiSelectorBuilder;

        /**
         * 添加过滤器，条件为可消除属性为真。
         *
         * @returns UI 选择器构造器自身
         *
         * @since v0.18.0
         */
        dismissable(): UiSelectorBuilder;

        /**
         * 添加过滤器，条件为可消除属性为指定值。
         *
         * @param value - 指定值
         * @returns UI 选择器构造器自身
         *
         * @since v0.18.0
         */
        dismissable(value: boolean): UiSelectorBuilder;

        /**
         * 添加过滤器，条件为深度属性为指定值。
         *
         * @param value - 指定值
         * @returns UI 选择器构造器自身
         *
         * @since v0.18.0
         */
        depth(value: number): UiSelectorBuilder;

        /**
         * 添加过滤器，条件为行属性为指定值。
         *
         * @param value - 指定值
         * @returns UI 选择器构造器自身
         *
         * @since v0.18.0
         */
        row(value: number): UiSelectorBuilder;

        /**
         * 添加过滤器，条件为行数属性为指定值。
         *
         * @param value - 指定值
         * @returns UI 选择器构造器自身
         *
         * @since v0.18.0
         */
        rowCount(value: number): UiSelectorBuilder;

        /**
         * 添加过滤器，条件为行跨度属性为指定值。
         *
         * @param value - 指定值
         * @returns UI 选择器构造器自身
         *
         * @since v0.18.0
         */
        rowSpan(value: number): UiSelectorBuilder;

        /**
         * 添加过滤器，条件为列属性为指定值。
         *
         * @param value - 指定值
         * @returns UI 选择器构造器自身
         *
         * @since v0.18.0
         */
        column(value: number): UiSelectorBuilder;

        /**
         * 添加过滤器，条件为列数属性为指定值。
         *
         * @param value - 指定值
         * @returns UI 选择器构造器自身
         *
         * @since v0.18.0
         */
        columnCount(value: number): UiSelectorBuilder;

        /**
         * 添加过滤器，条件为列跨度属性为指定值。
         *
         * @param value - 指定值
         * @returns UI 选择器构造器自身
         *
         * @since v0.18.0
         */
        columnSpan(value: number): UiSelectorBuilder;

        /**
         * 添加过滤器，条件为在父对象的索引属性为指定值。
         *
         * @param value - 指定值
         * @returns UI 选择器构造器自身
         *
         * @since v0.18.0
         */
        indexInParent(value: number): UiSelectorBuilder;

        /**
         * 添加过滤器，条件为绘画顺序属性为指定值。
         *
         * @param value - 指定值
         * @returns UI 选择器构造器自身
         *
         * @since v0.18.0
         */
        drawingOrder(value: number): UiSelectorBuilder;

        /**
         * 修改搜索算法为 BFS 算法。
         *
         * @returns UI 选择器构造器自身
         *
         * @since v0.18.0
         */
        bfs(): UiSelectorBuilder;

        /**
         * 修改搜索算法为 DFS 算法。
         *
         * @returns UI 选择器构造器自身
         *
         * @since v0.18.0
         */
        dfs(): UiSelectorBuilder;

        /**
         * 构造获得 UI 选择器。
         *
         * @returns UI 选择器
         *
         * @since v0.18.0
         */
        build(): UiSelector;
    }

    /**
     * Paddle 检测选项。
     *
     * @since v0.16.0
     * @category AI 人工智能
     */
    export interface PaddleDetOptions {
        /**
         * 检测矩形区域。
         */
        readonly region?: Rect;
        /**
         * 检测置信度阈值，范围 [0.0, 1.0]，数值越高则获得的区域越少。
         */
        readonly threshold?: number;
        /**
         * 检测框置信度阈值，范围 [0.0, 1.0]，数值越高则获得的区域越少。
         */
        readonly boxThreshold?: number;
        /**
         * 检测框最小允许的边长，小于边长的检测框会被舍弃。
         */
        readonly minSize?: number;
        /**
         * 检测图像输入长度。
         */
        readonly inputLength?: number;
    }

    /**
     * Paddle 识别选项。
     *
     * @since v0.16.0
     * @category AI 人工智能
     */
    export interface PaddleRecOptions {
        /**
         * 识别矩形区域。
         */
        readonly region?: Rect;
        /**
         * 识别图像输入长度。
         */
        readonly inputHeight?: number;
    }

    /**
     * Paddle 检测识别选项。
     *
     * @since v0.16.0
     * @category AI 人工智能
     */
    export interface PaddleOcrOptions {
        /**
         * Paddle 检测选项。
         */
        readonly detOptions?: PaddleDetOptions;
        /**
         * Paddle 识别选项。
         */
        readonly recOptions?: PaddleRecOptions;
        /**
         * 检测识别置信度阈值，范围 [0.0, 1.0]，数值越高则获得的区域越少。
         */
        readonly threshold?: number;
    }

    /**
     * Paddle 检测结果。
     *
     * @since v0.16.0
     * @category AI 人工智能
     */
    export interface PaddleDetResult {
        /**
         * 检测结果的点集合。
         */
        readonly box: Point[];
        /**
         * 检测结果的矩形。
         */
        readonly rect: Rect;
        /**
         * 检测结果的置信度。
         */
        readonly score: number;
    }

    /**
     * Paddle 识别结果。
     *
     * @since v0.16.0
     * @category AI 人工智能
     */
    export interface PaddleRecResult {
        /**
         * 检测结果的文本。
         */
        readonly text: string;
        /**
         * 检测结果的置信度。
         */
        readonly score: number;
    }

    /**
     * Paddle 检测识别结果。
     *
     * @since v0.16.0
     * @category AI 人工智能
     */
    export interface PaddleOcrResult {
        /**
         * 检测结果的点集合。
         */
        readonly box: Point[];
        /**
         * 检测结果的矩形。
         */
        readonly rect: Rect;
        /**
         * 检测结果的文本。
         */
        readonly text: string;
        /**
         * 检测结果的置信度。
         */
        readonly score: number;
    }

    /**
     * Paddle 模型对象。
     *
     * @since v0.16.0
     * @category AI 人工智能
     */
    export class PaddleModel {
        private constructor();

        /**
         * 回收对象，释放资源，回收对象后再使用对象进行识别将会导致报错。
         *
         * @since v0.16.0
         */
        recycle(): void;

        /**
         * 设置识别区域，设置的识别区域必须在图片范围内。
         *
         * @param ltrb - 矩形 LTRB 数组
         * @returns Paddle 模型自身
         *
         * @example
         * ```ts
         * // 设置识别区域为 (100, 100) (200, 200) 的区域
         * paddle.setRegion([100, 100, 200, 200])
         * ```
         *
         * @since v0.16.0
         */
        setRegion(ltrb: RectData): PaddleModel;

        /**
         * @param rect - 矩形构造选项
         * @returns Paddle 模型自身
         *
         * @example
         * ```ts
         * // 设置识别区域为 (100, 100) (200, 200) 的区域
         * paddle.setRegion(new Auto.Rect(100, 100, 200, 200))
         * ```
         *
         * @since v0.18.0
         */
        setRegion(rect: Rect): PaddleModel;

        /**
         * @param options - 矩形构造选项
         * @returns Paddle 模型自身
         *
         * @example
         * ```ts
         * // 设置识别区域为 (100, 100) (200, 200) 的区域
         * paddle.setRegion({ left: 100, top: 100, right: 200, bottom: 200 })
         * ```
         *
         * @since v0.16.0
         */
        setRegion(options: RectConstructorOptions): PaddleModel;

        /**
         * @param left - 矩形 L 坐标
         * @param top - 矩形 T 坐标
         * @param right - 矩形 R 坐标
         * @param bottom - 矩形 B 坐标
         * @returns Paddle 模型自身
         *
         * @example
         * ```ts
         * // 设置识别区域为 (100, 100) (200, 200) 的区域
         * paddle.setRegion(100, 100, 200, 200)
         * ```
         *
         * @since v0.16.0
         */
        setRegion(left: number | null, top: number | null, right: number | null, bottom: number | null): PaddleModel;

        /**
         * 设置检测选项。
         *
         * @param detOptions - Paddle 检测选项
         * @returns Paddle 模型自身
         *
         * @example
         * ```ts
         * const paddle = paddle.setDetOptions({ threshold: 0.3, boxThreshold: 0.6 })
         * ```
         *
         * @since v0.16.0
         */
        setDetOptions(detOptions: PaddleDetOptions): PaddleModel;

        /**
         * 设置识别选项。
         *
         * @param recOptions - Paddle 识别选项
         * @returns Paddle 模型自身
         *
         * @example
         * ```ts
         * const paddle = paddle.setRecOptions({ region: new Rect(100, 100, 200, 200) })
         * ```
         *
         * @since v0.16.0
         */
        setRecOptions(recOptions: PaddleRecOptions): PaddleModel;

        /**
         * 设置识别检测选项。
         *
         * @param ocrOptions - Paddle 识别检测选项
         * @returns Paddle 模型自身
         *
         * @example
         * ```ts
         * const paddle = paddle.setOcrOptions({ threshold: 0.8 })
         * ```
         *
         * @since v0.16.0
         */
        setOcrOptions(ocrOptions: PaddleOcrOptions): PaddleModel;

        /**
         * 使用媒体投影权限检测当前屏幕。
         *
         * @returns Paddle 检测结果集合
         *
         * @example
         * ```ts
         * const results = await paddle.det()
         * ```
         *
         * @since v0.16.0
         */
        det(): Promise<PaddleDetResult[]>;
        /**
         * 检测指定图片。
         *
         * @param path - 检测图片的路径
         * @returns Paddle 检测结果集合
         *
         * @example
         * ```ts
         * const imgPath = Android.getExternalStoragePath() + "/Resources/det.png"
         * const results = await paddle.det(imgPath)
         * ```
         *
         * @since v0.16.0
         */
        det(path: string): Promise<PaddleDetResult[]>;

        /**
         * 使用媒体投影权限识别当前屏幕。
         *
         * @returns Paddle 识别结果
         *
         * @example
         * ```ts
         * const result = await paddle.rec()
         * ```
         *
         * @since v0.16.0
         */
        rec(): Promise<PaddleRecResult>;
        /**
         * 识别指定图片。
         *
         * @param path - 识别图片的路径
         * @returns Paddle 识别结果
         *
         * @example
         * ```ts
         * const imgPath = Android.getExternalStoragePath() + "/Resources/rec.png"
         * const result = await paddle.rec(imgPath)
         * ```
         *
         * @since v0.16.0
         */
        rec(path: string): Promise<PaddleDetResult>;

        /**
         * 使用媒体投影权限检测识别当前屏幕。
         *
         * @returns PaddleModel 检测识别结果
         *
         * @example
         * ```ts
         * const results = await paddle.ocr()
         * ```
         *
         * @since v0.16.0
         */
        ocr(): Promise<PaddleOcrResult[]>;
        /**
         * 检测识别指定图片。
         *
         * @param path - 检测识别图片的路径
         * @returns Paddle 检测识别结果
         *
         * @example
         * ```ts
         * const imgPath = Android.getExternalStoragePath() + "/Resources/ocr.png"
         * const results = await paddle.ocr(imgPath)
         * ```
         *
         * @since v0.16.0
         */
        ocr(path: string): Promise<PaddleOcrResult[]>;
    }

    /**
     * 加载 Paddle 模型，可用于检测、识别文字。
     *
     * @param detModelPath - 检测模型完整路径
     * @param recModelPath - 识别模型完整路径
     * @param dictPath - 识别字典完整路径
     * @returns Paddle 模型对象
     *
     * @example
     * ```ts
     * const detModelPath = Android.getExternalStoragePath() + "/Resources/detModel.onnx"
     * const recModelPath = Android.getExternalStoragePath() + "/Resources/recModel.onnx"
     * const dictPath = Android.getExternalStoragePath() + "/Resources/dict.txt"
     * const paddle = await Autodn.loadPaddleModel(detModelPath, recModelPath, dictPath)
     * ```
     *
     * @since v0.16.0
     * @category AI 人工智能
     */
    export function loadPaddleModel(detModelPath: string, recModelPath: string, dictPath: string): Promise<PaddleModel>;

    /**
     * @category App 应用
     */
    export function toPackageName(appName: string): Promise<string>;

    /**
     * @category App 应用
     */
    export function toAppName(packageName: string): Promise<string>;

    /**
     * @category App 应用
     */
    export function launchPackage(packageName: string): Promise<void>;

    /**
     * @category App 应用
     */
    export function launchApp(appName: string): Promise<void>;

    /**
     * @category App 应用
     */
    export function stopPackage(packageName: string): Promise<void>;

    /**
     * @category App 应用
     */
    export function stopApp(appName: string): Promise<void>;

    /**
     * @category App 应用
     */
    export function installPackage(path: string): Promise<void>;

    /**
     * @category App 应用
     */
    export function uninstallPackage(packageName: string): Promise<void>;

    /**
     * @category App 应用
     */
    export function uninstallApp(appName: string): Promise<void>;

    /**
     * @category App 应用
     */
    export function getCurrentPackage(): Promise<string>;

    /**
     * @category App 应用
     */
    export function getCurrentApp(): Promise<string>;

    /**
     * @category App 应用
     */
    export function listRunningPackages(): Promise<string[]>;

    /**
     * @category App 应用
     */
    export function listRunningApps(): Promise<string[]>;

    /**
     * @category App 应用
     */
    export function getAppVersion(): string;

    /**
     * @category App 应用
     */
    export function getCoreVersion(): string;

    /**
     * @category App 应用
     */
    export function getInternalStoragePath(): string;

    /**
     * @category App 应用
     */
    export function getExternalStoragePath(): string;

    /**
     * @category Device 设备
     */
    export function getWidth(): number;

    /**
     * @category Device 设备
     */
    export function getHeight(): number;

    /**
     * @category Device 设备
     */
    export function getDensity(): number;

    /**
     * @category Device 设备
     */
    export function getOrientation(): number;

    /**
     * @category Device 设备
     */
    export function getBrightness(): number;

    /**
     * @category Device 设备
     */
    export function setBrightness(value: number): void;

    /**
     * @category Device 设备
     */
    export function getBrightnessMode(): number;

    /**
     * @category Device 设备
     */
    export function setBrightnessMode(value: number): void;

    /**
     * @category Device 设备
     */
    export function getMusicVolume(): number;

    /**
     * @category Device 设备
     */
    export function setMusicVolume(value: number): void;

    /**
     * @category Device 设备
     */
    export function getMusicMaxVolume(): number;

    /**
     * @category Device 设备
     */
    export function getMusicMinVolume(): number;

    /**
     * @category Device 设备
     */
    export function getNotificationVolume(): number;

    /**
     * @category Device 设备
     */
    export function setNotificationVolume(value: number): void;

    /**
     * @category Device 设备
     */
    export function getNotificationMaxVolume(): number;

    /**
     * @category Device 设备
     */
    export function getNotificationMinVolume(): number;

    /**
     * @category Device 设备
     */
    export function getAlarmVolume(): number;

    /**
     * @category Device 设备
     */
    export function setAlarmVolume(value: number): void;

    /**
     * @category Device 设备
     */
    export function getAlarmMaxVolume(): number;

    /**
     * @category Device 设备
     */
    export function getAlarmMinVolume(): number;

    /**
     * @category Device 设备
     */
    export function getBattery(): number;

    /**
     * @category Device 设备
     */
    export function getIsCharging(): boolean;

    /**
     * @category Device 设备
     */
    export function getTotalMem(): number;

    /**
     * @category Device 设备
     */
    export function getAvailMem(): number;

    /**
     * @category Device 设备
     */
    export function getIsLowMemory(): boolean;

    /**
     * @category Device 设备
     */
    export function getIsScreenOn(): boolean;

    /**
     * @category Device 设备
     */
    export function acquireScreenBright(): void;
    export function acquireScreenBright(timeout: number): void;

    /**
     * @category Device 设备
     */
    export function acquireScreenDim(): void;
    export function acquireScreenDim(timeout: number): void;

    /**
     * @category Device 设备
     */
    export function releaseScreen(): void;

    /**
     * @category Device 设备
     */
    export function vibrate(timeout: number): void;

    /**
     * @category Device 设备
     */
    export function cancelVibrate(): void;

    /**
     * @category Device 设备
     */
    export function getBuildId(): string;

    /**
     * @category Device 设备
     */
    export function getBuildDisplay(): string;

    /**
     * @category Device 设备
     */
    export function getBuildProduct(): string;

    /**
     * @category Device 设备
     */
    export function getBuildDevice(): string;

    /**
     * @category Device 设备
     */
    export function getBuildBoard(): string;

    /**
     * @category Device 设备
     */
    export function getBuildManufacturer(): string;

    /**
     * @category Device 设备
     */
    export function getBuildBrand(): string;

    /**
     * @category Device 设备
     */
    export function getBuildModel(): string;

    /**
     * @category Device 设备
     */
    export function getBuildSocManufacturer(): string;

    /**
     * @category Device 设备
     */
    export function getBuildSocModel(): string;

    /**
     * @category Device 设备
     */
    export function getBuildBootloader(): string;

    /**
     * @category Device 设备
     */
    export function getBuildRadio(): string;

    /**
     * @category Device 设备
     */
    export function getBuildHardware(): string;

    /**
     * @category Device 设备
     */
    export function getBuildSku(): string;

    /**
     * @category Device 设备
     */
    export function getBuildOdmSku(): string;

    /**
     * @category Device 设备
     */
    export function getBuildSerial(): string;

    /**
     * @category Device 设备
     */
    export function getBuildSupportedAbis(): string[];

    /**
     * @category Device 设备
     */
    export function getBuildSupported32BitAbis(): string[];

    /**
     * @category Device 设备
     */
    export function getBuildSupported64BitAbis(): string[];

    /**
     * @category Device 设备
     */
    export function getBuildType(): string;

    /**
     * @category Device 设备
     */
    export function getBuildTags(): string;

    /**
     * @category Device 设备
     */
    export function getBuildFingerprint(): string;

    /**
     * @category Device 设备
     */
    export function getBuildTime(): string;

    /**
     * @category Device 设备
     */
    export function getBuildUser(): string;

    /**
     * @category Device 设备
     */
    export function getBuildHost(): string;

    /**
     * @category Device 设备
     */
    export function getBuildSdkInt(): number;

    /**
     * @category Device 设备
     */
    export function getBuildIncremental(): string;

    /**
     * @category Device 设备
     */
    export function getBuildRelease(): string;

    /**
     * @category Device 设备
     */
    export function getBuildBaseOs(): string;

    /**
     * @category Device 设备
     */
    export function getBuildSecurityPatch(): string;

    /**
     * @category Device 设备
     */
    export function getBuildCodename(): string;

    /**
     * @category Device 设备
     */
    export function getImei(): string;

    /**
     * @category Device 设备
     */
    export function getAndroidId(): string;

    /**
     * @category Device 设备
     */
    export function getIpAddress(): string;

    /**
     * @category Device 设备
     */
    export function getMacAddress(): string;

    /**
     * @category Device 设备
     */
    export function getBluetoothAddress(): string;

    /**
     * @category Device 设备
     */
    export function getIsKeyguardSecure(): boolean;

    /**
     * @category Device 设备
     */
    export function getIsKeyguardLocked(): boolean;

    /**
     * @category Device 设备
     */
    export function getIsDeviceSecure(): boolean;

    /**
     * @category Device 设备
     */
    export function getIsDeviceLocked(): boolean;

    /**
     * @category Finger 手指
     */
    export function homeAccessibility(): void;

    /**
     * @category Finger 手指
     */
    export function backAccessibility(): void;

    /**
     * @category Finger 手指
     */
    export function recentsAccessibility(): void;

    /**
     * @category Finger 手指
     */
    export function notificationsAccessibility(): void;

    /**
     * @category Finger 手指
     */
    export function lockScreenAccessibility(): void;

    /**
     * @category Finger 手指
     */
    export function powerDialogAccessibility(): void;

    /**
     * @category Finger 手指
     */
    export function quickSettingsAccessibility(): void;

    /**
     * @category Finger 手指
     */
    export function takeScreenshotAccessibility(): void;

    /**
     * @category Finger 手指
     */
    export function toggleSplitScreenAccessibility(): void;

    /**
     * @category Finger 手指
     */
    export function tapAccessibility(point: Point): Promise<void>;
    export function tapAccessibility(point: PointConstructorOptions): Promise<void>;
    export function tapAccessibility(x: number, y: number): Promise<void>;

    /**
     * @category Finger 手指
     */
    export function swipeAccessibility(pointFrom: Point, pointTo: Point): Promise<void>;
    export function swipeAccessibility(pointFrom: Point, pointTo: Point, duration: number): Promise<void>;
    export function swipeAccessibility(
        pointFrom: PointConstructorOptions,
        pointTo: PointConstructorOptions,
    ): Promise<void>;
    export function swipeAccessibility(
        pointFrom: PointConstructorOptions,
        pointTo: PointConstructorOptions,
        duration: number,
    ): Promise<void>;
    export function swipeAccessibility(xFrom: number, yFrom: number, xTo: number, yTo: number): Promise<void>;
    export function swipeAccessibility(
        xFrom: number,
        yFrom: number,
        xTo: number,
        yTo: number,
        duration: number,
    ): Promise<void>;

    /**
     * @category Finger 手指
     */
    export function dragAndDropAccessibility(pointFrom: Point, pointTo: Point): Promise<void>;
    export function dragAndDropAccessibility(pointFrom: Point, pointTo: Point, duration: number): Promise<void>;
    export function dragAndDropAccessibility(
        pointFrom: PointConstructorOptions,
        pointTo: PointConstructorOptions,
    ): Promise<void>;
    export function dragAndDropAccessibility(
        pointFrom: PointConstructorOptions,
        pointTo: PointConstructorOptions,
        duration: number,
    ): Promise<void>;
    export function dragAndDropAccessibility(xFrom: number, yFrom: number, xTo: number, yTo: number): Promise<void>;
    export function dragAndDropAccessibility(
        xFrom: number,
        yFrom: number,
        xTo: number,
        yTo: number,
        duration: number,
    ): Promise<void>;

    /**
     * @category Finger 手指
     */
    export function tapPrivilege(point: Point): Promise<void>;
    export function tapPrivilege(point: PointConstructorOptions): Promise<void>;
    export function tapPrivilege(x: number, y: number): Promise<void>;

    /**
     * @category Finger 手指
     */
    export function tapRoot(point: Point): Promise<void>;
    export function tapRoot(point: PointConstructorOptions): Promise<void>;
    export function tapRoot(x: number, y: number): Promise<void>;

    /**
     * @category Finger 手指
     */
    export function tapShizuku(point: Point): Promise<void>;
    export function tapShizuku(point: PointConstructorOptions): Promise<void>;
    export function tapShizuku(x: number, y: number): Promise<void>;

    /**
     * @category Finger 手指
     */
    export function swipePrivilege(pointFrom: Point, pointTo: Point): Promise<void>;
    export function swipePrivilege(pointFrom: Point, pointTo: Point, duration: number): Promise<void>;
    export function swipePrivilege(pointFrom: PointConstructorOptions, pointTo: PointConstructorOptions): Promise<void>;
    export function swipePrivilege(
        pointFrom: PointConstructorOptions,
        pointTo: PointConstructorOptions,
        duration: number,
    ): Promise<void>;
    export function swipePrivilege(xFrom: number, yFrom: number, xTo: number, yTo: number): Promise<void>;
    export function swipePrivilege(
        xFrom: number,
        yFrom: number,
        xTo: number,
        yTo: number,
        duration: number,
    ): Promise<void>;

    /**
     * @category Finger 手指
     */
    export function swipeRoot(pointFrom: Point, pointTo: Point): Promise<void>;
    export function swipeRoot(pointFrom: Point, pointTo: Point, duration: number): Promise<void>;
    export function swipeRoot(pointFrom: PointConstructorOptions, pointTo: PointConstructorOptions): Promise<void>;
    export function swipeRoot(
        pointFrom: PointConstructorOptions,
        pointTo: PointConstructorOptions,
        duration: number,
    ): Promise<void>;
    export function swipeRoot(xFrom: number, yFrom: number, xTo: number, yTo: number): Promise<void>;
    export function swipeRoot(xFrom: number, yFrom: number, xTo: number, yTo: number, duration: number): Promise<void>;

    /**
     * @category Finger 手指
     */
    export function swipeShizuku(pointFrom: Point, pointTo: Point): Promise<void>;
    export function swipeShizuku(pointFrom: Point, pointTo: Point, duration: number): Promise<void>;
    export function swipeShizuku(pointFrom: PointConstructorOptions, pointTo: PointConstructorOptions): Promise<void>;
    export function swipeShizuku(
        pointFrom: PointConstructorOptions,
        pointTo: PointConstructorOptions,
        duration: number,
    ): Promise<void>;
    export function swipeShizuku(xFrom: number, yFrom: number, xTo: number, yTo: number): Promise<void>;
    export function swipeShizuku(
        xFrom: number,
        yFrom: number,
        xTo: number,
        yTo: number,
        duration: number,
    ): Promise<void>;

    /**
     * @category Finger 手指
     */
    export function dragAndDropPrivilege(pointFrom: Point, pointTo: Point): Promise<void>;
    export function dragAndDropPrivilege(pointFrom: Point, pointTo: Point, duration: number): Promise<void>;
    export function dragAndDropPrivilege(
        pointFrom: PointConstructorOptions,
        pointTo: PointConstructorOptions,
    ): Promise<void>;
    export function dragAndDropPrivilege(
        pointFrom: PointConstructorOptions,
        pointTo: PointConstructorOptions,
        duration: number,
    ): Promise<void>;
    export function dragAndDropPrivilege(xFrom: number, yFrom: number, xTo: number, yTo: number): Promise<void>;
    export function dragAndDropPrivilege(
        xFrom: number,
        yFrom: number,
        xTo: number,
        yTo: number,
        duration: number,
    ): Promise<void>;

    /**
     * @category Finger 手指
     */
    export function dragAndDropRoot(pointFrom: Point, pointTo: Point): Promise<void>;
    export function dragAndDropRoot(pointFrom: Point, pointTo: Point, duration: number): Promise<void>;
    export function dragAndDropRoot(
        pointFrom: PointConstructorOptions,
        pointTo: PointConstructorOptions,
    ): Promise<void>;
    export function dragAndDropRoot(
        pointFrom: PointConstructorOptions,
        pointTo: PointConstructorOptions,
        duration: number,
    ): Promise<void>;
    export function dragAndDropRoot(xFrom: number, yFrom: number, xTo: number, yTo: number): Promise<void>;
    export function dragAndDropRoot(
        xFrom: number,
        yFrom: number,
        xTo: number,
        yTo: number,
        duration: number,
    ): Promise<void>;

    /**
     * @category Finger 手指
     */
    export function dragAndDropShizuku(pointFrom: Point, pointTo: Point): Promise<void>;
    export function dragAndDropShizuku(pointFrom: Point, pointTo: Point, duration: number): Promise<void>;
    export function dragAndDropShizuku(
        pointFrom: PointConstructorOptions,
        pointTo: PointConstructorOptions,
    ): Promise<void>;
    export function dragAndDropShizuku(
        pointFrom: PointConstructorOptions,
        pointTo: PointConstructorOptions,
        duration: number,
    ): Promise<void>;
    export function dragAndDropShizuku(xFrom: number, yFrom: number, xTo: number, yTo: number): Promise<void>;
    export function dragAndDropShizuku(
        xFrom: number,
        yFrom: number,
        xTo: number,
        yTo: number,
        duration: number,
    ): Promise<void>;

    /**
     * @category Finger 手指
     */
    export function downPrivilege(point: Point): Promise<void>;
    export function downPrivilege(point: PointConstructorOptions): Promise<void>;
    export function downPrivilege(x: number, y: number): Promise<void>;

    /**
     * @category Finger 手指
     */
    export function downRoot(point: Point): Promise<void>;
    export function downRoot(point: PointConstructorOptions): Promise<void>;
    export function downRoot(x: number, y: number): Promise<void>;

    /**
     * @category Finger 手指
     */
    export function downShizuku(point: Point): Promise<void>;
    export function downShizuku(point: PointConstructorOptions): Promise<void>;
    export function downShizuku(x: number, y: number): Promise<void>;

    /**
     * @category Finger 手指
     */
    export function movePrivilege(point: Point): Promise<void>;
    export function movePrivilege(point: PointConstructorOptions): Promise<void>;
    export function movePrivilege(x: number, y: number): Promise<void>;

    /**
     * @category Finger 手指
     */
    export function moveRoot(point: Point): Promise<void>;
    export function moveRoot(point: PointConstructorOptions): Promise<void>;
    export function moveRoot(x: number, y: number): Promise<void>;

    /**
     * @category Finger 手指
     */
    export function moveShizuku(point: Point): Promise<void>;
    export function moveShizuku(point: PointConstructorOptions): Promise<void>;
    export function moveShizuku(x: number, y: number): Promise<void>;

    /**
     * @category Finger 手指
     */
    export function upPrivilege(point: Point): Promise<void>;
    export function upPrivilege(point: PointConstructorOptions): Promise<void>;
    export function upPrivilege(x: number, y: number): Promise<void>;

    /**
     * @category Finger 手指
     */
    export function upRoot(point: Point): Promise<void>;
    export function upRoot(point: PointConstructorOptions): Promise<void>;
    export function upRoot(x: number, y: number): Promise<void>;

    /**
     * @category Finger 手指
     */
    export function upShizuku(point: Point): Promise<void>;
    export function upShizuku(point: PointConstructorOptions): Promise<void>;
    export function upShizuku(x: number, y: number): Promise<void>;

    /**
     * @category Finger 手指
     */
    export function multiDownPrivilege(point: Point): Promise<void>;
    export function multiDownPrivilege(point: Point, id: number): Promise<void>;
    export function multiDownPrivilege(point: PointConstructorOptions): Promise<void>;
    export function multiDownPrivilege(point: PointConstructorOptions, id: number): Promise<void>;
    export function multiDownPrivilege(x: number, y: number): Promise<void>;
    export function multiDownPrivilege(x: number, y: number, id: number): Promise<void>;

    /**
     * @category Finger 手指
     */
    export function multiDownRoot(point: Point): Promise<void>;
    export function multiDownRoot(point: Point, id: number): Promise<void>;
    export function multiDownRoot(point: PointConstructorOptions): Promise<void>;
    export function multiDownRoot(point: PointConstructorOptions, id: number): Promise<void>;
    export function multiDownRoot(x: number, y: number): Promise<void>;
    export function multiDownRoot(x: number, y: number, id: number): Promise<void>;

    /**
     * @category Finger 手指
     */
    export function multiDownShizuku(point: Point): Promise<void>;
    export function multiDownShizuku(point: Point, id: number): Promise<void>;
    export function multiDownShizuku(point: PointConstructorOptions): Promise<void>;
    export function multiDownShizuku(point: PointConstructorOptions, id: number): Promise<void>;
    export function multiDownShizuku(x: number, y: number): Promise<void>;
    export function multiDownShizuku(x: number, y: number, id: number): Promise<void>;

    /**
     * @category Finger 手指
     */
    export function multiMovePrivilege(point: Point): Promise<void>;
    export function multiMovePrivilege(point: Point, id: number): Promise<void>;
    export function multiMovePrivilege(point: PointConstructorOptions): Promise<void>;
    export function multiMovePrivilege(point: PointConstructorOptions, id: number): Promise<void>;
    export function multiMovePrivilege(x: number, y: number): Promise<void>;
    export function multiMovePrivilege(x: number, y: number, id: number): Promise<void>;

    /**
     * @category Finger 手指
     */
    export function multiMoveRoot(point: Point): Promise<void>;
    export function multiMoveRoot(point: Point, id: number): Promise<void>;
    export function multiMoveRoot(point: PointConstructorOptions): Promise<void>;
    export function multiMoveRoot(point: PointConstructorOptions, id: number): Promise<void>;
    export function multiMoveRoot(x: number, y: number): Promise<void>;
    export function multiMoveRoot(x: number, y: number, id: number): Promise<void>;

    /**
     * @category Finger 手指
     */
    export function multiMoveShizuku(point: Point): Promise<void>;
    export function multiMoveShizuku(point: Point, id: number): Promise<void>;
    export function multiMoveShizuku(point: PointConstructorOptions): Promise<void>;
    export function multiMoveShizuku(point: PointConstructorOptions, id: number): Promise<void>;
    export function multiMoveShizuku(x: number, y: number): Promise<void>;
    export function multiMoveShizuku(x: number, y: number, id: number): Promise<void>;

    /**
     * @category Finger 手指
     */
    export function multiUpPrivilege(): Promise<void>;
    export function multiUpPrivilege(id: number): Promise<void>;

    /**
     * @category Finger 手指
     */
    export function multiUpRoot(): Promise<void>;
    export function multiUpRoot(id: number): Promise<void>;

    /**
     * @category Finger 手指
     */
    export function multiUpShizuku(): Promise<void>;
    export function multiUpShizuku(id: number): Promise<void>;

    /**
     * @category Floater 悬浮窗
     */
    export class Floater {
        static builder(): FloaterBuilder;

        static builder(id: string): FloaterBuilder;

        readonly id: string;

        private constructor();

        show(): Promise<Floater>;

        updatePosition(x: number, y: number): Floater;

        updateSize(width: number, heigth: number): Floater;

        updateBackgroundColor(color: number): Floater;

        updateText(text: string): Floater;

        updateTextColor(color: number): Floater;

        close(): Promise<Floater>;
    }

    /**
     * @category Floater 悬浮窗
     */
    export class FloaterBuilder {
        private constructor();

        setPosition(x: number, y: number): FloaterBuilder;

        setSize(width: number, heigth: number): FloaterBuilder;

        setBackgroundColor(color: number): FloaterBuilder;

        setText(text: string): FloaterBuilder;

        setTextColor(color: number): FloaterBuilder;

        build(): Floater;
    }

    /**
     * 对比颜色选项。
     *
     * @since v0.18.0
     * @category Img 图像
     */
    export interface CompareColorOptions {
        /**
         * 阈值，整数类型，允许 RGB 通道偏差值之和。
         *
         * @since v0.18.0
         */
        readonly threshold?: number;
    }

    /**
     * 查找颜色选项。
     *
     * @since v0.18.0
     * @category Img 图像
     */
    export interface FindColorOptions {
        /**
         * 阈值，整数类型，允许 RGB 通道偏差值之和。
         *
         * @since v0.18.0
         */
        readonly threshold?: number;

        /**
         * 指定查找区域。
         *
         * @since v0.18.0
         */
        readonly region?: IntoRect;
    }

    /**
     * 保存图像选项。
     *
     * @since v0.18.0
     * @category Img 图像
     */
    export interface SaveImageOptions {
        /**
         * 文件名。
         *
         * @since v0.18.0
         */
        readonly filename?: string;

        /**
         * 指定路径，使用该选项则文件名会被忽略。
         *
         * @since v0.18.0
         */
        readonly path?: string;

        /**
         * 指定保存区域。
         *
         * @since v0.18.0
         */
        readonly region?: IntoRect;
    }

    /**
     * @since v0.18.0
     * @category Img 图像
     */
    export class Image {
        private constructor();

        /**
         * 回收图像，回收之后再调用图像相关函数将会报错。
         *
         * @since v0.18.0
         */
        recycle(): void;

        /**
         * 获取图像宽度。
         *
         * @returns 图像宽度
         *
         * @since v0.18.0
         */
        getWidth(): number;

        /**
         * 获取图像高度。
         *
         * @returns 图像高度
         *
         * @since v0.18.0
         */
        getHeight(): number;

        /**
         * 获取指定坐标的颜色值。
         *
         * @param x - X坐标
         * @param y - Y坐标
         * @returns 颜色值
         *
         * @since v0.18.0
         */
        getColor(x: number, y: number): number;

        /**
         * 获取图像数据。
         *
         * @returns 图像的比特数组
         *
         * @since v0.18.0
         */
        getData(): Uint8Array;

        /**
         * 保存图像。
         *
         * @returns 图像保存路径
         *
         * @since v0.18.0
         */
        save(): Promise<string>;

        /**
         * 指定文件名保存图像。
         *
         * @returns 图像保存路径
         *
         * @since v0.18.0
         */
        saveAs(filename: string): Promise<string>;
    }

    /**
     * 获取当前图像。
     *
     * @returns Image 实例
     *
     * @since v0.18.0
     * @category Img 图像
     */
    export function getImage(): Promise<Image>;

    /**
     * 刷新图像缓存。
     *
     * @since v0.18.0
     * @category Img 图像
     */
    export function refreshImage(): Promise<void>;

    /**
     * 锁定图像缓存。
     *
     * @since v0.18.0
     * @category Img 图像
     */
    export function lockImage(): void;

    /**
     * 解锁图像缓存。
     *
     * @since v0.18.0
     * @category Img 图像
     */
    export function unlockImage(): void;

    /**
     * 保存缓存图像。
     *
     * @param options - 保存图像选项
     * @returns 图像保存路径
     *
     * @since v0.18.0
     * @category Img 图像
     */
    export function saveImage(options?: SaveImageOptions): Promise<string>;

    /**
     * 对比颜色。
     *
     * @param intoPoint - 可转换为 Point 的数据类型
     * @param options - 对比颜色选项
     * @returns 对比颜色的结果
     *
     * @since v0.18.0
     * @category Img 图像
     */
    export function compareColor(intoPoint: IntoPoint, options?: CompareColorOptions): Promise<boolean>;

    /**
     * 对比多个颜色。
     *
     * @param intoPoints - 可转换为 Point 的数据类型的集合
     * @param options - 对比颜色选项
     * @returns 对比颜色的结果
     *
     * @since v0.18.0
     * @category Img 图像
     */
    export function compareMultiColor(intoPoints: IntoPoint[], options?: CompareColorOptions): Promise<boolean>;

    /**
     * 查找颜色，返回首个找到的点。
     *
     * @param intoPoint - 可转换为 Point 的数据类型
     * @param options - 查找颜色选项
     * @returns 查找到的点
     *
     * @since v0.18.0
     * @category Img 图像
     */
    export function findColor(intoPoint: IntoPoint, options?: FindColorOptions): Promise<Point>;

    /**
     * 查找颜色，返回所有找到的点。
     *
     * @param intoPoint - 可转换为 Point 的数据类型
     * @param options - 查找颜色选项
     * @returns 查找到的点的集合
     *
     * @since v0.18.0
     * @category Img 图像
     */
    export function findColors(intoPoint: IntoPoint, options?: FindColorOptions): Promise<Point[]>;

    /**
     * 查找颜色，返回首个找到的点。
     *
     * @param intoPoints - 可转换为 Point 的数据类型的集合
     * @param options - 查找颜色选项
     * @returns 查找到的点
     *
     * @since v0.18.0
     * @category Img 图像
     */
    export function findMultiColor(intoPoints: IntoPoint[], options?: FindColorOptions): Promise<Point>;

    /**
     * 查找颜色，返回所有找到的点。
     *
     * @param intoPoints - 可转换为 Point 的数据类型的集合
     * @param options - 查找颜色选项
     * @returns 查找到的点的集合
     *
     * @since v0.18.0
     * @category Img 图像
     */
    export function findMultiColors(intoPoints: IntoPoint[], options?: FindColorOptions): Promise<Point[]>;

    /**
     * @category I/O 输入输出
     */
    export namespace log {
        /**
         * 输出级别为 `VERBOSE` 的日志。
         *
         * @category I/O 输入输出
         */
        export function verbose(...args: any[]): void;

        /**
         * 输出级别为 `DEBUG` 的日志。
         *
         * @category I/O 输入输出
         */
        export function debug(...args: any[]): void;

        /**
         * 输出级别为 `INFO` 的日志。
         *
         * @category I/O 输入输出
         */
        export function info(...args: any[]): void;

        /**
         * 输出级别为 `WARN` 的日志。
         *
         * @category I/O 输入输出
         */
        export function warn(...args: any[]): void;

        /**
         * 输出级别为 `ERROR` 的日志。
         *
         * @category I/O 输入输出
         */
        export function error(...args: any[]): void;

        /**
         * 输出级别为 `ASSERT` 的日志。
         *
         * @category I/O 输入输出
         */
        export function assert(...args: any[]): void;

        /**
         * 同 `verbose`。
         *
         * @category I/O 输入输出
         */
        export function v(...args: any[]): void;

        /**
         * 同 `debug`。
         *
         * @category I/O 输入输出
         */
        export function d(...args: any[]): void;

        /**
         * 同 `info`。
         *
         * @category I/O 输入输出
         */
        export function i(...args: any[]): void;

        /**
         * 同 `warn`。
         *
         * @category I/O 输入输出
         */
        export function w(...args: any[]): void;

        /**
         * 同 `error`。
         *
         * @category I/O 输入输出
         */
        export function e(...args: any[]): void;

        /**
         * 同 `assert`。
         *
         * @category I/O 输入输出
         */
        export function a(...args: any[]): void;
    }

    /**
     * 输出吐司消息。
     *
     * @param args - 任意数据
     *
     * @since v0.18.0
     * @category I/O 输入输出
     */
    export function toast(...args: any[]): void;

    /**
     * 通知选项。
     *
     * @since v0.18.0
     * @category I/O 输入输出
     */
    export interface NotificationOptions {
        /**
         * 小图标路径。
         *
         * @since v0.18.0
         */
        smallIcon?: string;
        /**
         * 大图标路径。
         *
         * @since v0.18.0
         */
        largeIcon?: string;
    }

    /**
     * 输出通知消息。
     *
     * @param title - 标题
     * @param message - 消息
     * @param options - 通知选项
     *
     * @since v0.18.0
     * @category I/O 输入输出
     */
    export function notification(title: string, message: string, options?: NotificationOptions): void;

    /**
     * 使用特权输入文本。
     *
     * @param text - 要输入的文本
     *
     * @since v0.18.0
     * @category I/O 输入输出
     */
    export function inputTextPrivilege(text: string): Promise<void>;

    /**
     * 使用 ROOT 用户输入文本。
     *
     * @param text - 要输入的文本
     *
     * @since v0.18.0
     * @category I/O 输入输出
     */
    export function inputTextRoot(text: string): Promise<void>;

    /**
     * 使用 Shizuku 用户输入文本。
     *
     * @param text - 要输入的文本
     *
     * @since v0.18.0
     * @category I/O 输入输出
     */
    export function inputTextShizuku(text: string): Promise<void>;

    /**
     * 使用特权输入按键事件。
     *
     * @param key - 要输入的按键
     *
     * @since v0.18.0
     * @category I/O 输入输出
     */
    export function inputKeyEventPrivilege(key: string): Promise<void>;

    /**
     * 使用 ROOT 用户输入按键事件。
     *
     * @param key - 要输入的按键
     *
     * @since v0.18.0
     * @category I/O 输入输出
     */
    export function inputKeyEventRoot(key: string): Promise<void>;

    /**
     * 使用 Shizuku 用户输入按键事件。
     *
     * @param key - 要输入的按键
     *
     * @since v0.18.0
     * @category I/O 输入输出
     */
    export function inputKeyEventShizuku(key: string): Promise<void>;

    /**
     * @category Project 工程
     */
    export function runProject(projectName: string): Promise<void>;

    /**
     * @category Project 工程
     */
    export function stopProject(): void;
    export function stopProject(projectName: string): void;

    /**
     * @category Project 工程
     */
    export function stopAllProjects(): void;

    /**
     * @category Project 工程
     */
    export function listProjects(): Promise<string[]>;

    /**
     * @category Project 工程
     */
    export function listRunningProjects(): string[];

    /**
     * @category Project 工程
     */
    export function destroyProject(projectName: string): Promise<void>;

    /**
     * @since v0.17.0
     * @category Project 工程
     */
    export type ProjectCategory = 'Normal' | 'BundleFile' | 'ConfigFile' | 'Others';

    /**
     * @since v0.17.0
     * @category Project 工程
     */
    export interface ProjectInfo {
        /**
         * 工程详细信息。
         */
        readonly project: {
            /**
             * 工程名称。
             */
            readonly name: string;

            /**
             * 工程路径。
             */
            readonly path: string;

            /**
             * 工程类型。
             */
            readonly category: ProjectCategory;

            /**
             * 工程入口点。
             */
            readonly entryPoint: string;

            /**
             * 工程工作目录。
             */
            readonly workingDir: string;

            /**
             * 工程配置文件。
             */
            readonly config: string;

            /**
             * 工程远程仓库。
             */
            readonly repository: string;

            /**
             * 工程是否添加到快捷方式。
             */
            readonly shortcut: boolean;

            /**
             * 工程权限。
             */
            readonly permissions: string[];

            /**
             * 工程参数。
             */
            readonly arguments: string[];

            /**
             * 工程任务。
             */
            readonly tasks: string[];

            /**
             * 工程更新时间戳。
             */
            readonly updatedAt: number;

            /**
             * 工程缓存时间戳。
             */
            readonly cachedAt: number;

            /**
             * 工程加载时间戳。
             */
            readonly loadedAt: number;
        };

        /**
         * 工程是否正在运行。
         */
        readonly running: boolean;

        /**
         * 工程 ID。
         */
        readonly id: number;

        /**
         * 工程计划运行时间戳。
         */
        readonly planAt: number;
    }

    /**
     * @category Project 工程
     */
    export function getProjectInfo(): Promise<ProjectInfo>;
    export function getProjectInfo(projectName: string): Promise<ProjectInfo>;

    /**
     * @category Project 工程
     */
    export function gitClone(repository: string): Promise<void>;

    /**
     * @category Project 工程
     */
    export function gitPull(repository: string): Promise<void>;

    /**
     * Shell 执行结果。
     *
     * @since v0.17.0
     * @category Shell
     */
    export interface ShellExecResult {
        /**
         * 执行结果的退出代码。
         */
        readonly code: number;

        /**
         * 执行结果的输出流集合。
         */
        readonly out: string[];

        /**
         * 执行结果的错误输出流集合。
         */
        readonly err: string[];

        /**
         * 执行是否成功。
         */
        readonly isSuccess: boolean;
    }

    /**
     * 以普通用户的权限执行命令。
     *
     * @param cmd - 执行命令
     * @returns Shell 执行结果
     *
     * @example
     * ```ts
     * // 执行命令查看当前用户
     * const result = await Autodn.execSh("whoami");
     * Autodn.log.d(result);
     * ```
     *
     * @since v0.17.0
     * @category Shell
     */
    export function execSh(cmd: string): Promise<ShellExecResult>;

    /**
     * 以同步的方式执行`execSh`。
     *
     * @param cmd - 执行命令
     * @returns Shell 执行结果
     *
     * @example
     * ```ts
     * // 执行命令查看当前用户
     * const result = Autodn.execShSync("whoami");
     * Autodn.log.d(result);
     * ```
     *
     * @since v0.17.0
     * @category Shell
     */
    export function execShSync(cmd: string): ShellExecResult;

    /**
     * 以 ROOT 用户的权限执行命令。
     *
     * @param cmd - 执行命令
     * @returns Shell 执行结果
     *
     * @example
     * ```ts
     * // 执行命令查看当前用户
     * const result = await Autodn.execSu("whoami");
     * Autodn.log.d(result);
     * ```
     *
     * @since v0.17.0
     * @category Shell
     */
    export function execSu(cmd: string): Promise<ShellExecResult>;

    /**
     * 以同步的方式执行`execSu`。
     *
     * @param cmd - 执行命令
     * @returns Shell 执行结果
     *
     * @example
     * ```ts
     * // 执行命令查看当前用户
     * const result = Autodn.execSuSync("whoami");
     * Autodn.log.d(result);
     * ```
     *
     * @since v0.17.0
     * @category Shell
     */
    export function execSuSync(cmd: string): ShellExecResult;

    /**
     * 以 ROOT 用户(Libsu库)的权限执行命令。
     *
     * @param cmd - 执行命令
     * @returns Shell 执行结果
     *
     * @example
     * ```ts
     * // 执行命令查看当前用户
     * const result = await Autodn.execLibsu("whoami");
     * Autodn.log.d(result);
     * ```
     *
     * @since v0.17.0
     * @category Shell
     */
    export function execLibsu(cmd: string): Promise<ShellExecResult>;

    /**
     * 以同步的方式执行`execLibsu`。
     *
     * @param cmd - 执行命令
     * @returns Shell 执行结果
     *
     * @example
     * ```ts
     * // 执行命令查看当前用户
     * const result = Autodn.execLibsuSync("whoami");
     * Autodn.log.d(result);
     * ```
     *
     * @since v0.17.0
     * @category Shell
     */
    export function execLibsuSync(cmd: string): ShellExecResult;

    /**
     * 以 Shizuku 用户的权限执行命令。
     *
     * @param cmd - 执行命令
     * @returns Shell 执行结果
     *
     * @example
     * ```ts
     * // 执行命令查看当前用户
     * const result = await Autodn.execShizuku("whoami");
     * Autodn.log.d(result);
     * ```
     *
     * @since v0.17.0
     * @category Shell
     */
    export function execShizuku(cmd: string): Promise<ShellExecResult>;

    /**
     * 以同步的方式执行`execShizuku`。
     *
     * @param cmd - 执行命令
     * @returns Shell 执行结果
     *
     * @example
     * ```ts
     * // 执行命令查看当前用户
     * const result = Autodn.execShizukuSync("whoami");
     * Autodn.log.d(result);
     * ```
     *
     * @since v0.17.0
     * @category Shell
     */
    export function execShizukuSync(cmd: string): ShellExecResult;

    /**
     * @category System 系统
     */
    export function delay(duration: number): Promise<void>;

    /**
     * @category System 系统
     */
    export function sleep(duration: number): void;

    /**
     * 快速 UI 结果类型。
     *
     * @since v0.18.0
     * @category UI 用户界面
     */
    export type QuickUiResultCategory = 'Ok' | 'Cancel' | 'Last' | 'Empty';

    /**
     * 快速 UI 值类型。
     *
     * @since v0.18.0
     * @category UI 用户界面
     */
    export type QuickUiResultValue = string | boolean | string[];

    /**
     * 快速 UI 结果。
     *
     * @since v0.18.0
     * @category UI 用户界面
     */
    export class QuickUiResult {
        /**
         * 快速 UI 结果类型。
         *
         * @since v0.18.0
         */
        readonly category: QuickUiResultCategory;

        /**
         * 快速 UI 结果 Map。
         *
         * @since v0.18.0
         */
        readonly result: Map<string, QuickUiResultValue>;
    }

    /**
     * 快速 UI 选择组件选项。
     *
     * @since v0.18.0
     * @category UI 用户界面
     */
    export interface QuickUiSelectOptions {
        /**
         * 标签。
         *
         * @since v0.18.0
         */
        readonly label?: string;

        /**
         * 可选项。
         *
         * @since v0.18.0
         */
        readonly options?: string[];

        /**
         * 可选项的展示文本，需要与可选项一一对应。
         *
         * @since v0.18.0
         */
        readonly displayOptions?: string[];

        /**
         * 默认值。
         *
         * @since v0.18.0
         */
        readonly defaultValue?: string;
    }

    /**
     * 快速 UI 开关组件选项。
     *
     * @since v0.18.0
     * @category UI 用户界面
     */
    export interface QuickUiSwitchOptions {
        /**
         * 标签。
         *
         * @since v0.18.0
         */
        readonly label?: string;

        /**
         * 默认值。
         *
         * @since v0.18.0
         */
        readonly defaultValue?: boolean;
    }

    /**
     * 快速 UI 选项组件选项。
     *
     * @since v0.18.0
     * @category UI 用户界面
     */
    export interface QuickUiCheckboxOptions {
        /**
         * 标签。
         *
         * @since v0.18.0
         */
        readonly label?: string;

        /**
         * 可选项。
         *
         * @since v0.18.0
         */
        readonly options?: string[];

        /**
         * 可选项的展示文本，需要与可选项一一对应。
         *
         * @since v0.18.0
         */
        readonly displayOptions?: string[];

        /**
         * 默认值。
         *
         * @since v0.18.0
         */
        readonly defaultValue?: string[];
    }

    /**
     * 快速 UI 输入组件选项。
     *
     * @since v0.18.0
     * @category UI 用户界面
     */
    export interface QuickUiInputOptions {
        /**
         * 标签。
         *
         * @since v0.18.0
         */
        readonly label?: string;

        /**
         * 默认值。
         *
         * @since v0.18.0
         */
        readonly defaultValue?: string;
    }

    /**
     * 快速 UI 文本组件选项。
     *
     * @since v0.18.0
     * @category UI 用户界面
     */
    export interface QuickUiTextOptions {
        /**
         * 文本。
         *
         * @since v0.18.0
         */
        readonly value?: string;

        /**
         * 字号。
         *
         * @since v0.18.0
         */
        readonly fontSize?: number;

        /**
         * 颜色。
         *
         * @since v0.18.0
         */
        readonly color?: number;
    }

    /**
     * 快速 UI，旨在快速构建一个可用的用户配置交互窗口。
     *
     * @since v0.18.0
     * @category UI 用户界面
     */
    export class QuickUi {
        /**
         * 构造器，默认使用自动编号的匿名 ID。
         *
         * @returns QuickUiBuilder 实例
         *
         * @example
         * ```ts
         * const builder = Autodn.QuickUi.builder()
         * ```
         *
         * @since v0.18.0
         */
        static builder(): QuickUiBuilder;

        /**
         * 带 ID 的构造器。
         *
         * @returns QuickUiBuilder 实例
         *
         * @example
         * ```ts
         * const builder = Autodn.QuickUi.builder("quick_ui_001")
         * ```
         *
         * @since v0.18.0
         */
        static builder(id: string): QuickUiBuilder;

        /**
         * QuickUiBuilder 实例的 ID。
         *
         * @example
         * ```ts
         * const quickui = Autodn.QuickUi.builder("quick_ui_001").build()
         * const id = quickui.id // id == "quick_ui_001"
         * ```
         *
         * @since v0.18.0
         */
        readonly id: string;

        private constructor();

        /**
         * 展示快速 UI，Promise 为等待展示结束。
         *
         * @returns QuickUi 实例自身
         *
         * @example
         * ```ts
         * const quickui = Autodn.QuickUi.builder("quick_ui_001").build()
         * await quickui.show()
         * ```
         *
         * @since v0.18.0
         */
        show(): Promise<QuickUi>;

        /**
         * 获取此时的快速 UI 结果。
         *
         * @returns 快速 UI 结果
         *
         * @example
         * ```ts
         * const quickui = Autodn.QuickUi.builder("quick_ui_001").build()
         * quickui.show()
         * const result = quickui.getResult() // 如果此时快速 UI 窗口未关闭，结果为 `Empty`
         * ```
         *
         * @since v0.18.0
         */
        getResult(): QuickUiResult;

        /**
         * 获取上一次的快速 UI 结果。
         *
         * @returns 快速 UI 结果
         *
         * @example
         * ```ts
         * const quickui = Autodn.QuickUi.builder("quick_ui_001").build()
         * await quickui.show()
         * const result = await quickui.getLastResult()
         * ```
         *
         * @since v0.18.0
         */
        getLastResult(): Promise<QuickUiResult>;

        /**
         * 等待快速 UI 窗口关闭并获取快速 UI 结果。
         *
         * @returns 快速 UI 结果
         *
         * @example
         * ```ts
         * const quickui = Autodn.QuickUi.builder("quick_ui_001").build()
         * quickui.show()
         * const result = await quickui.waitForResult()
         * ```
         *
         * @since v0.18.0
         */
        waitForResult(): Promise<QuickUiResult>;
    }

    /**
     * 快速 UI 构造器。
     *
     * @since v0.18.0
     * @category UI 用户界面
     */
    export class QuickUiBuilder {
        private constructor();

        /**
         * 设置快速 UI 窗口的标题。
         *
         * @param content - 标题文本
         * @returns QuickUiBuilder 实例自身
         *
         * @example
         * ```ts
         * const quickui = Autodn.QuickUi.builder()
         *     .setTitle("QUICK_UI_001")
         *     .build()
         * await quickui.show()
         * ```
         *
         * @since v0.18.0
         */
        setTitle(content: string): QuickUiBuilder;

        /**
         * 设置快速 UI 窗口的确认按钮文本。
         *
         * @param content - 确认按钮文本
         * @returns QuickUiBuilder 实例自身
         *
         * @example
         * ```ts
         * const quickui = Autodn.QuickUi.builder()
         *     .setOkText("确认")
         *     .build()
         * await quickui.show()
         * ```
         *
         * @since v0.18.0
         */
        setOkText(content: string): QuickUiBuilder;

        /**
         * 设置快速 UI 窗口的取消按钮文本。
         *
         * @param content - 取消按钮文本
         * @returns QuickUiBuilder 实例自身
         *
         * @example
         * ```ts
         * const quickui = Autodn.QuickUi.builder()
         *     .setCancelText("取消")
         *     .build()
         * await quickui.show()
         * ```
         *
         * @since v0.18.0
         */
        setCancelText(content: string): QuickUiBuilder;

        /**
         * 设置快速 UI 窗口的倒计时，不设置倒计时则窗口展示时间无限，直到手动关闭。
         *
         * @param s - 倒计时秒数
         * @returns QuickUiBuilder 实例自身
         *
         * @example
         * ```ts
         * const quickui = Autodn.QuickUi.builder()
         *     .setCountDownTime(10)
         *     .build()
         * await quickui.show()
         * ```
         *
         * @since v0.18.0
         */
        setCountDownTime(s: number): QuickUiBuilder;

        /**
         * 添加一个选择组件。
         *
         * @param id - 选择组件的 ID
         * @param options - 选择组件选项
         * @returns QuickUiBuilder 实例自身
         *
         * @example
         * ```ts
         * const quickui = Autodn.QuickUi.builder()
         *     .addSelect("select_001", {}) // 添加一个默认的组件
         *     .build()
         * await quickui.show()
         * ```
         *
         * @since v0.18.0
         */
        addSelect(id: string, options: QuickUiSelectOptions): QuickUiBuilder;

        /**
         * 添加一个开关组件。
         *
         * @param id - 开关组件的 ID
         * @param options - 开关组件选项
         * @returns QuickUiBuilder 实例自身
         *
         * @example
         * ```ts
         * const quickui = Autodn.QuickUi.builder()
         *     .addSwitch("switch_001", {}) // 添加一个默认的组件
         *     .build()
         * await quickui.show()
         * ```
         *
         * @since v0.18.0
         */
        addSwitch(id: string, options: QuickUiSwitchOptions): QuickUiBuilder;

        /**
         * 添加一个选项组件。
         *
         * @param id - 选项组件的 ID
         * @param options - 选项组件选项
         * @returns QuickUiBuilder 实例自身
         *
         * @example
         * ```ts
         * const quickui = Autodn.QuickUi.builder()
         *     .addCheckbox("checkbox_001", {}) // 添加一个默认的组件
         *     .build()
         * await quickui.show()
         * ```
         *
         * @since v0.18.0
         */
        addCheckbox(id: string, options: QuickUiCheckboxOptions): QuickUiBuilder;

        /**
         * 添加一个输入组件。
         *
         * @param id - 输入组件的 ID
         * @param options - 输入组件选项
         * @returns QuickUiBuilder 实例自身
         *
         * @example
         * ```ts
         * const quickui = Autodn.QuickUi.builder()
         *     .addInput("input_001", {}) // 添加一个默认的组件
         *     .build()
         * await quickui.show()
         * ```
         *
         * @since v0.18.0
         */
        addInput(id: string, options: QuickUiInputOptions): QuickUiBuilder;

        /**
         * 添加一个文本组件。
         *
         * @param id - 文本组件的 ID
         * @param options - 文本组件选项
         * @returns QuickUiBuilder 实例自身
         *
         * @example
         * ```ts
         * const quickui = Autodn.QuickUi.builder()
         *     .addText("text_001", {}) // 添加一个默认的组件
         *     .build()
         * await quickui.show()
         * ```
         *
         * @since v0.18.0
         */
        addText(id: string, options: QuickUiTextOptions): QuickUiBuilder;

        /**
         * 构建 QuickUi 实例。
         *
         * @returns QuickUi 实例
         *
         * @example
         * ```ts
         * const quickui = Autodn.QuickUi.builder().build()
         * await quickui.show()
         * ```
         *
         * @since v0.18.0
         */
        build(): QuickUi;
    }
}
