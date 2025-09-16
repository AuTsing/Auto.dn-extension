// deno-lint-ignore-file no-explicit-any

/**
 * @version 0.15.3
 */
declare namespace Autodn {
    /**
     * @category Common 通用
     */
    export interface PointConstructorOptions {
        readonly x?: number;

        readonly y?: number;

        readonly c?: number;
    }

    /**
     * @category Common 通用
     */
    export type PointData = [number, number, number];

    /**
     * @category Common 通用
     */
    export class Point {
        static readonly defaultOptions: {
            readonly x: number;

            readonly y: number;

            readonly c: number;
        };

        static isPointData(value: any): boolean;

        readonly x: number;

        readonly y: number;

        readonly c: number;

        constructor();
        constructor(xyc: PointData);
        constructor(options: PointConstructorOptions);
        constructor(x: number | null, y: number | null, c: number | null);
    }

    /**
     * @category Common 通用
     */
    export interface RectConstructorOptions {
        readonly left?: number;

        readonly top?: number;

        readonly right?: number;

        readonly bottom?: number;
    }

    /**
     * @category Common 通用
     */
    export type RectData = [number, number, number, number];

    /**
     * @category Common 通用
     */
    export class Rect {
        static readonly defaultOptions: {
            readonly left: number;

            readonly top: number;

            readonly right: number;

            readonly bottom: number;
        };

        static isRectData(value: any): boolean;

        readonly left: number;

        readonly top: number;

        readonly right: number;

        readonly bottom: number;

        constructor();
        constructor(ltrb: RectData);
        constructor(options: RectConstructorOptions);
        constructor(left: number | null, top: number | null, right: number | null, bottom: number | null);
    }

    /**
     * @category Accessibility 无障碍
     */
    export class UiObject {
        private constructor();

        getParent(): UiObject | null;

        getChild(i: number): UiObject | null;

        getId(): string;

        getDesc(): string;

        getClassName(): string;

        getPackageName(): string;

        getText(): string;

        getOriginId(): number;

        getDepth(): number;

        getIndexInParent(): number;

        getDrawingOrder(): number;

        getRow(): number;

        getRowSpan(): number;

        getRowCount(): number;

        getColumn(): number;

        getColumnSpan(): number;

        getColumnCount(): number;

        getAccessibilityFocused(): boolean;

        getChecked(): boolean;

        getCheckable(): boolean;

        getClickable(): boolean;

        getContextClickable(): boolean;

        getDismissable(): boolean;

        getEnabled(): boolean;

        getEditable(): boolean;

        getFocusable(): boolean;

        getFocused(): boolean;

        getLongClickable(): boolean;

        getSelected(): boolean;

        getScrollable(): boolean;

        getVisibleToUser(): boolean;

        getPassword(): boolean;

        getContentInvalid(): boolean;

        getMultiLine(): boolean;

        getBoundsInScreen(): Rect;

        getChildCount(): number;

        getChildren(): UiObject[];

        getAllChildren(): UiObject[];

        click(): void;

        longClick(): void;

        accessibilityFocus(): void;

        clearAccessibilityFocus(): void;

        focus(): void;

        clearFocus(): void;

        copy(): void;

        paste(): void;

        select(): void;

        cut(): void;

        collapse(): void;

        expand(): void;

        dismiss(): void;

        showOnScreen(): void;

        scrollForward(): void;

        scrollBackward(): void;

        scrollUp(): void;

        scrollDown(): void;

        scrollLeft(): void;

        scrollRight(): void;

        contextClick(): void;

        setSelection(start: number, end: number): void;

        setText(text: string): void;

        setProgress(value: number): void;

        scrollTo(row: number, column: number): void;
    }

    /**
     * @category Accessibility 无障碍
     */
    export class UiSelector {
        static builder(): UiSelectorBuilder;

        private constructor();

        find(): UiObject[];

        findOne(): UiObject | null;

        untilFind(): Promise<UiObject[]>;
        untilFind(timeout: number): Promise<UiObject[]>;

        untilFindOne(): Promise<UiObject>;
        untilFindOne(timeout: number): Promise<UiObject>;

        exists(): boolean;

        wait(): Promise<void>;
        wait(timeout: number): Promise<void>;
    }

    /**
     * @category Accessibility 无障碍
     */
    export class UiSelectorBuilder {
        private constructor();

        id(id: string): UiSelectorBuilder;

        idEquals(id: string): UiSelectorBuilder;

        idContains(content: string): UiSelectorBuilder;

        idMatches(regex: string): UiSelectorBuilder;

        idStartsWith(prefix: string): UiSelectorBuilder;

        idEndsWith(suffix: string): UiSelectorBuilder;

        text(text: string): UiSelectorBuilder;

        textEquals(text: string): UiSelectorBuilder;

        textContains(content: string): UiSelectorBuilder;

        textMatches(regex: string): UiSelectorBuilder;

        textStartsWith(prefix: string): UiSelectorBuilder;

        textEndsWith(suffix: string): UiSelectorBuilder;

        desc(desc: string): UiSelectorBuilder;

        descEquals(desc: string): UiSelectorBuilder;

        descContains(content: string): UiSelectorBuilder;

        descMatches(regex: string): UiSelectorBuilder;

        descStartsWith(prefix: string): UiSelectorBuilder;

        descEndsWith(suffix: string): UiSelectorBuilder;

        className(className: string): UiSelectorBuilder;

        classNameEquals(className: string): UiSelectorBuilder;

        classNameContains(content: string): UiSelectorBuilder;

        classNameMatches(regex: string): UiSelectorBuilder;

        classNameStartsWith(prefix: string): UiSelectorBuilder;

        classNameEndsWith(suffix: string): UiSelectorBuilder;

        packageName(packageName: string): UiSelectorBuilder;

        packageNameEquals(packageName: string): UiSelectorBuilder;

        packageNameContains(content: string): UiSelectorBuilder;

        packageNameMatches(regex: string): UiSelectorBuilder;

        packageNameStartsWith(prefix: string): UiSelectorBuilder;

        packageNameEndsWith(suffix: string): UiSelectorBuilder;

        bounds(rect: Rect): UiSelectorBuilder;

        boundsEquals(rect: Rect): UiSelectorBuilder;

        boundsInside(rect: Rect): UiSelectorBuilder;

        boundsContains(rect: Rect): UiSelectorBuilder;

        checkable(): UiSelectorBuilder;
        checkable(value: boolean): UiSelectorBuilder;

        checked(): UiSelectorBuilder;
        checked(value: boolean): UiSelectorBuilder;

        focusable(): UiSelectorBuilder;
        focusable(value: boolean): UiSelectorBuilder;

        focused(): UiSelectorBuilder;
        focused(value: boolean): UiSelectorBuilder;

        visibleToUser(): UiSelectorBuilder;
        visibleToUser(value: boolean): UiSelectorBuilder;

        accessibilityFocused(): UiSelectorBuilder;
        accessibilityFocused(value: boolean): UiSelectorBuilder;

        selected(): UiSelectorBuilder;
        selected(value: boolean): UiSelectorBuilder;

        clickable(): UiSelectorBuilder;
        clickable(value: boolean): UiSelectorBuilder;

        longClickable(): UiSelectorBuilder;
        longClickable(value: boolean): UiSelectorBuilder;

        enabled(): UiSelectorBuilder;
        enabled(value: boolean): UiSelectorBuilder;

        password(): UiSelectorBuilder;
        password(value: boolean): UiSelectorBuilder;

        scrollable(): UiSelectorBuilder;
        scrollable(value: boolean): UiSelectorBuilder;

        editable(): UiSelectorBuilder;
        editable(value: boolean): UiSelectorBuilder;

        contentInvalid(): UiSelectorBuilder;
        contentInvalid(value: boolean): UiSelectorBuilder;

        contextClickable(): UiSelectorBuilder;
        contextClickable(value: boolean): UiSelectorBuilder;

        multiLine(): UiSelectorBuilder;
        multiLine(value: boolean): UiSelectorBuilder;

        dismissable(): UiSelectorBuilder;
        dismissable(value: boolean): UiSelectorBuilder;

        depth(value: number): UiSelectorBuilder;

        row(value: number): UiSelectorBuilder;

        rowCount(value: number): UiSelectorBuilder;

        rowSpan(value: number): UiSelectorBuilder;

        column(value: number): UiSelectorBuilder;

        columnCount(value: number): UiSelectorBuilder;

        columnSpan(value: number): UiSelectorBuilder;

        indexInParent(value: number): UiSelectorBuilder;

        drawingOrder(value: number): UiSelectorBuilder;

        bfs(): UiSelectorBuilder;

        dfs(): UiSelectorBuilder;

        build(): UiSelector;
    }

    /**
     * @category AI 人工智能
     */
    export enum DnnBackend {
        DNN_BACKEND_DEFAULT = 1,
        DNN_BACKEND_HALIDE = 0 + 1,
        DNN_BACKEND_INFERENCE_ENGINE = 0 + 2,
        DNN_BACKEND_OPENCV = 0 + 3,
        DNN_BACKEND_VKCOM = 0 + 4,
        DNN_BACKEND_CUDA = 0 + 5,
        DNN_BACKEND_WEBNN = 0 + 6,
        DNN_BACKEND_TIMVX = 0 + 7,
        DNN_BACKEND_CANN = 0 + 8,
    }

    /**
     * @category AI 人工智能
     */
    export enum DnnTarget {
        DNN_TARGET_CPU = 0,
        DNN_TARGET_OPENCL = 0 + 1,
        DNN_TARGET_OPENCL_FP16 = 0 + 2,
        DNN_TARGET_MYRIAD = 0 + 3,
        DNN_TARGET_VULKAN = 0 + 4,
        DNN_TARGET_FPGA = 0 + 5,
        DNN_TARGET_CUDA = 0 + 6,
        DNN_TARGET_CUDA_FP16 = 0 + 7,
        DNN_TARGET_HDDL = 0 + 8,
        DNN_TARGET_NPU = 0 + 9,
        DNN_TARGET_CPU_FP16 = 0 + 10,
    }

    /**
     * @category AI 人工智能
     */
    export interface DetectResult {
        readonly classId: number;

        readonly confidence: number;

        readonly box: number[];
    }

    /**
     * @category AI 人工智能
     */
    export interface RecognizeResult {
        readonly classId: number;

        readonly confidence: number;
    }

    /**
     * @category AI 人工智能
     */
    export class Model {
        private constructor();

        recycle(): void;

        setBackend(backendId: DnnBackend): void;

        setTarget(targetId: DnnTarget): void;

        setConfidenceThreshold(threshold: number): void;

        setNmsThreshold(threshold: number): void;

        setRegion(ltrb: RectData): void;
        setRegion(options: RectConstructorOptions): void;
        setRegion(left: number | null, top: number | null, right: number | null, bottom: number | null): void;

        detect(): Promise<DetectResult[]>;
        detect(path: string): Promise<DetectResult[]>;

        recognize(): Promise<RecognizeResult[]>;
        recognize(path: string): Promise<RecognizeResult[]>;
    }

    /**
     * @category AI 人工智能
     */
    export function loadModel(path: string): Promise<Model>;

    /**
     * @category AI 人工智能
     */
    export function loadOnnxModel(path: string): Promise<Model>;

    /**
     * @category AI 人工智能
     */
    export function loadCaffeModel(prototxtPath: string, modelPath: string): Promise<Model>;

    /**
     * @category AI 人工智能
     */
    export function loadDarknetModel(cfgPath: string, modelPath: string): Promise<Model>;

    /**
     * @category AI 人工智能
     */
    export function loadTfliteModel(path: string): Promise<Model>;

    /**
     * @category AI 人工智能
     */
    export function loadTensorfloModel(modelPath: string, configPath: string): Promise<Model>;

    /**
     * @category AI 人工智能
     */
    export function loadTorchModel(path: string): Promise<Model>;

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
     * @category Img 图像
     */
    export interface CompareColorOptionsConstructorOptions {
        readonly threshold?: number;
    }

    /**
     * @category Img 图像
     */
    export class CompareColorOptions {
        static readonly defaultOptions: {
            readonly threshold: number;
        };

        readonly threshold: number;

        constructor();
        constructor(options: CompareColorOptionsConstructorOptions);
    }

    /**
     * @category Img 图像
     */
    export interface FindColorOptionsConstructorOptions {
        readonly threshold?: number;

        readonly region?: Rect | RectData;
    }

    /**
     * @category Img 图像
     */
    export class FindColorOptions {
        static readonly defaultOptions: {
            readonly threshold: number;

            readonly region: Rect;
        };

        readonly threshold: number;

        readonly region: Rect;

        constructor();
        constructor(options: FindColorOptionsConstructorOptions);
    }

    /**
     * @category Img 图像
     */
    export interface SaveImageOptionsConstructorOptions {
        readonly filename?: string;

        readonly path?: string;

        readonly region?: Rect | RectData;
    }

    /**
     * @category Img 图像
     */
    export class SaveImageOptions {
        static readonly defaultOptions: {
            readonly filename: string;

            readonly path: string;

            readonly region: Rect;
        };

        readonly filename: string;

        readonly path: string;

        readonly region: Rect;

        constructor();
        constructor(options: SaveImageOptionsConstructorOptions);
    }

    /**
     * @category Img 图像
     */
    export class Image {
        private constructor();

        recycle(): void;

        getWidth(): number;

        getHeight(): number;

        getColor(x: number, y: number): number;

        getData(): Uint8Array;

        save(): Promise<string>;

        saveAs(filename: string): Promise<string>;
    }

    /**
     * @category Img 图像
     */
    export function getImage(): Promise<Image>;

    /**
     * @category Img 图像
     */
    export function refreshImage(): Promise<void>;

    /**
     * @category Img 图像
     */
    export function lockImage(): void;

    /**
     * @category Img 图像
     */
    export function unlockImage(): void;

    /**
     * @category Img 图像
     */
    export function saveImage(): Promise<string>;
    export function saveImage(options: SaveImageOptions): Promise<string>;
    export function saveImage(options: SaveImageOptionsConstructorOptions): Promise<string>;

    /**
     * @category Img 图像
     */
    export function compareColor(xyc: PointData): Promise<boolean>;
    export function compareColor(point: Point): Promise<boolean>;
    export function compareColor(point: PointConstructorOptions): Promise<boolean>;
    export function compareColor(xyc: PointData, options: CompareColorOptions): Promise<boolean>;
    export function compareColor(point: Point, options: CompareColorOptions): Promise<boolean>;
    export function compareColor(point: PointConstructorOptions, options: CompareColorOptions): Promise<boolean>;
    export function compareColor(xyc: PointData, options: CompareColorOptionsConstructorOptions): Promise<boolean>;
    export function compareColor(point: Point, options: CompareColorOptionsConstructorOptions): Promise<boolean>;
    export function compareColor(
        point: PointConstructorOptions,
        options: CompareColorOptionsConstructorOptions,
    ): Promise<boolean>;

    /**
     * @category Img 图像
     */
    export function compareColors(xycs: PointData[]): Promise<boolean>;
    export function compareColors(points: Point[]): Promise<boolean>;
    export function compareColors(points: PointConstructorOptions[]): Promise<boolean>;
    export function compareColors(xycs: PointData[], options: CompareColorOptions): Promise<boolean>;
    export function compareColors(points: Point[], options: CompareColorOptions): Promise<boolean>;
    export function compareColors(points: PointConstructorOptions[], options: CompareColorOptions): Promise<boolean>;
    export function compareColors(xycs: PointData[], options: CompareColorOptionsConstructorOptions): Promise<boolean>;
    export function compareColors(points: Point[], options: CompareColorOptionsConstructorOptions): Promise<boolean>;
    export function compareColors(
        points: PointConstructorOptions[],
        options: CompareColorOptionsConstructorOptions,
    ): Promise<boolean>;

    /**
     * @category Img 图像
     */
    export function findColor(xyc: PointData): Promise<Point>;
    export function findColor(point: Point): Promise<Point>;
    export function findColor(point: PointConstructorOptions): Promise<Point>;
    export function findColor(xyc: PointData, options: FindColorOptions): Promise<Point>;
    export function findColor(point: Point, options: FindColorOptions): Promise<Point>;
    export function findColor(point: PointConstructorOptions, options: FindColorOptions): Promise<Point>;
    export function findColor(xyc: PointData, options: FindColorOptionsConstructorOptions): Promise<Point>;
    export function findColor(point: Point, options: FindColorOptionsConstructorOptions): Promise<Point>;
    export function findColor(
        point: PointConstructorOptions,
        options: FindColorOptionsConstructorOptions,
    ): Promise<Point>;

    /**
     * @category Img 图像
     */
    export function findColors(xyc: PointData): Promise<Point[]>;
    export function findColors(point: Point): Promise<Point[]>;
    export function findColors(point: PointConstructorOptions): Promise<Point[]>;
    export function findColors(xyc: PointData, options: FindColorOptions): Promise<Point[]>;
    export function findColors(point: Point, options: FindColorOptions): Promise<Point[]>;
    export function findColors(point: PointConstructorOptions, options: FindColorOptions): Promise<Point[]>;
    export function findColors(xyc: PointData, options: FindColorOptionsConstructorOptions): Promise<Point[]>;
    export function findColors(point: Point, options: FindColorOptionsConstructorOptions): Promise<Point[]>;
    export function findColors(
        point: PointConstructorOptions,
        options: FindColorOptionsConstructorOptions,
    ): Promise<Point[]>;

    /**
     * @category Img 图像
     */
    export function findMultiColor(xycs: PointData[]): Promise<Point>;
    export function findMultiColor(points: Point[]): Promise<Point>;
    export function findMultiColor(points: PointConstructorOptions[]): Promise<Point>;
    export function findMultiColor(xycs: PointData[], options: FindColorOptions): Promise<Point>;
    export function findMultiColor(points: Point[], options: FindColorOptions): Promise<Point>;
    export function findMultiColor(points: PointConstructorOptions[], options: FindColorOptions): Promise<Point>;
    export function findMultiColor(xycs: PointData[], options: FindColorOptionsConstructorOptions): Promise<Point>;
    export function findMultiColor(points: Point[], options: FindColorOptionsConstructorOptions): Promise<Point>;
    export function findMultiColor(
        points: PointConstructorOptions[],
        options: FindColorOptionsConstructorOptions,
    ): Promise<Point>;

    /**
     * @category Img 图像
     */
    export function findMultiColors(xycs: PointData[]): Promise<Point[]>;
    export function findMultiColors(points: Point[]): Promise<Point[]>;
    export function findMultiColors(points: PointConstructorOptions[]): Promise<Point[]>;
    export function findMultiColors(xycs: PointData[], options: FindColorOptions): Promise<Point[]>;
    export function findMultiColors(points: Point[], options: FindColorOptions): Promise<Point[]>;
    export function findMultiColors(points: PointConstructorOptions[], options: FindColorOptions): Promise<Point[]>;
    export function findMultiColors(xycs: PointData[], options: FindColorOptionsConstructorOptions): Promise<Point[]>;
    export function findMultiColors(points: Point[], options: FindColorOptionsConstructorOptions): Promise<Point[]>;
    export function findMultiColors(
        points: PointConstructorOptions[],
        options: FindColorOptionsConstructorOptions,
    ): Promise<Point[]>;

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
     * @category I/O 输入输出
     */
    export function toast(...args: any[]): void;

    /**
     * @category I/O 输入输出
     */
    export interface NotificationOptions {
        smallIcon: string | null;
        largeIcon: string | null;
    }

    /**
     * @category I/O 输入输出
     */
    export function notification(title: string, message: string): void;
    export function notification(title: string, message: string, options: NotificationOptions): void;

    /**
     * @category I/O 输入输出
     */
    export function inputTextPrivilege(text: string): Promise<void>;

    /**
     * @category I/O 输入输出
     */
    export function inputTextRoot(text: string): Promise<void>;

    /**
     * @category I/O 输入输出
     */
    export function inputTextShizuku(text: string): Promise<void>;

    /**
     * @category I/O 输入输出
     */
    export function inputKeyEventPrivilege(key: string): Promise<void>;

    /**
     * @category I/O 输入输出
     */
    export function inputKeyEventRoot(key: string): Promise<void>;

    /**
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
     * @category Project 工程
     */
    export type ProjectCategory = 'Normal' | 'ConfigFile' | 'Others';

    /**
     * @category Project 工程
     */
    export interface ProjectInfo {
        readonly name: string;

        readonly path: string;

        readonly category: ProjectCategory;

        readonly entryPoint: string;

        readonly workingDir: string;

        readonly configFilePath: string;

        readonly shortcut: boolean;

        readonly permissions: string[];

        readonly args: string[];

        readonly repository: string;

        readonly updatedAt: number;

        readonly cachedAt: number;

        readonly tasks: string[];

        readonly running: boolean;

        readonly id: number;

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
     * @category Shell
     */
    export interface ShellResultConstructorOptions {
        readonly code?: number;

        readonly out?: string[];

        readonly err?: string[];

        readonly isSuccess?: boolean;
    }

    /**
     * @category Shell
     */
    export class ShellResult {
        static readonly defaultOptions: {
            readonly code: number;

            readonly out: string[];

            readonly err: string[];

            readonly isSuccess: boolean;
        };

        readonly code: number;

        readonly out: string[];

        readonly err: string[];

        readonly isSuccess: boolean;

        constructor();
        constructor(options: ShellResultConstructorOptions);
    }

    /**
     * @category Shell
     */
    export function execSh(cmd: string): Promise<ShellResult>;

    /**
     * @category Shell
     */
    export function execShSync(cmd: string): ShellResult;

    /**
     * @category Shell
     */
    export function execSu(cmd: string): Promise<ShellResult>;

    /**
     * @category Shell
     */
    export function execSuSync(cmd: string): ShellResult;

    /**
     * @category Shell
     */
    export function execLibsu(cmd: string): Promise<ShellResult>;

    /**
     * @category Shell
     */
    export function execLibsuSync(cmd: string): ShellResult;

    /**
     * @category Shell
     */
    export function execShizuku(cmd: string): Promise<ShellResult>;

    /**
     * @category Shell
     */
    export function execShizukuSync(cmd: string): ShellResult;

    /**
     * @category System 系统
     */
    export function delay(duration: number): Promise<void>;

    /**
     * @category System 系统
     */
    export function sleep(duration: number): void;

    /**
     * @category UI 用户界面
     */
    export type QuickUiResultCategory = 'Ok' | 'Cancel' | 'Last' | 'Empty';

    /**
     * @category UI 用户界面
     */
    export type QuickUiResultValueCategory = string | boolean | string[];

    /**
     * @category UI 用户界面
     */
    export class QuickUiResult {
        readonly category: QuickUiResultCategory;

        readonly result: Map<string, QuickUiResultValueCategory>;
    }

    /**
     * @category UI 用户界面
     */
    export interface QuickUiSelectOptionsConstructorOptions {
        readonly label?: string;

        readonly options?: string[];

        readonly displayOptions?: string[];

        readonly defaultValue?: string;
    }

    /**
     * @category UI 用户界面
     */
    export class QuickUiSelectOptions {
        static readonly defaultOptions: {
            readonly label: string;

            readonly options: string[];

            readonly displayOptions: string[];

            readonly defaultValue: string;
        };

        readonly label: string;

        readonly options: string[];

        readonly displayOptions: string[];

        readonly defaultValue: string;

        constructor();
        constructor(options: QuickUiSelectOptionsConstructorOptions);
        constructor(
            label: string | null,
            options: string[] | null,
            displayOptions: string[] | null,
            defaultValue: string | null,
        );
    }

    /**
     * @category UI 用户界面
     */
    export interface QuickUiSwitchOptionsConstructorOptions {
        readonly label?: string;

        readonly defaultValue?: string;
    }

    /**
     * @category UI 用户界面
     */
    export class QuickUiSwitchOptions {
        static readonly defaultOptions: {
            readonly label: string;

            readonly defaultValue: string;
        };

        readonly label: string;

        readonly defaultValue: string;

        constructor();
        constructor(options: QuickUiSwitchOptionsConstructorOptions);
        constructor(label: string | null, defaultValue: string | null);
    }

    /**
     * @category UI 用户界面
     */
    export interface QuickUiCheckboxOptionsConstructorOptions {
        readonly label?: string;

        readonly options?: string[];

        readonly displayOptions?: string[];

        readonly defaultValue?: string[];
    }

    /**
     * @category UI 用户界面
     */
    export class QuickUiCheckboxOptions {
        static readonly defaultOptions: {
            readonly label: string;

            readonly options: string[];

            readonly displayOptions: string[];

            readonly defaultValue: string[];
        };

        readonly label: string;

        readonly options: string[];

        readonly displayOptions: string[];

        readonly defaultValue: string[];

        constructor();
        constructor(options: QuickUiCheckboxOptionsConstructorOptions);
        constructor(
            label: string | null,
            options: string[] | null,
            displayOptions: string[] | null,
            defaultValue: string[] | null,
        );
    }

    /**
     * @category UI 用户界面
     */
    export interface QuickUiInputOptionsConstructorOptions {
        readonly label?: string;

        readonly defaultValue?: string;
    }

    /**
     * @category UI 用户界面
     */
    export class QuickUiInputOptions {
        static readonly defaultOptions: {
            readonly label: string;

            readonly defaultValue: string;
        };

        readonly label: string;

        readonly defaultValue: string;

        constructor();
        constructor(options: QuickUiInputOptionsConstructorOptions);
        constructor(label: string | null, defaultValue: string | null);
    }

    /**
     * @category UI 用户界面
     */
    export interface QuickUiTextOptionsConstructorOptions {
        readonly value?: string;

        readonly fontSize?: number;

        readonly color?: number;
    }

    /**
     * @category UI 用户界面
     */
    export class QuickUiTextOptions {
        static readonly defaultOptions: {
            readonly value: string;

            readonly fontSize: number;

            readonly color: number;
        };

        readonly value: string;

        readonly fontSize: number;

        readonly color: number;

        constructor();
        constructor(options: QuickUiTextOptionsConstructorOptions);
        constructor(value: string | null, fontSize: number | null, color: number | null);
    }

    /**
     * @category UI 用户界面
     */
    export class QuickUi {
        static builder(): QuickUiBuilder;

        static builder(id: string): QuickUiBuilder;

        readonly id: string;

        private constructor();

        show(): Promise<QuickUi>;

        getResult(): QuickUiResult;

        getLastResult(): Promise<QuickUiResult>;

        waitForResult(): Promise<QuickUiResult>;
    }

    /**
     * @category UI 用户界面
     */
    export class QuickUiBuilder {
        private constructor();

        setTitle(content: string): QuickUiBuilder;

        setOkText(content: string): QuickUiBuilder;

        setCancelText(content: string): QuickUiBuilder;

        setCountDownTime(s: number): QuickUiBuilder;

        addSelect(id: string): QuickUiBuilder;
        addSelect(id: string, options: QuickUiSelectOptions): QuickUiBuilder;
        addSelect(id: string, options: QuickUiSelectOptionsConstructorOptions): QuickUiBuilder;
        addSelect(
            id: string,
            label: string | null,
            options: string[] | null,
            displayOptions: string[] | null,
            defaultValue: string | null,
        ): QuickUiBuilder;

        addSwitch(id: string): QuickUiBuilder;
        addSwitch(id: string, options: QuickUiSwitchOptions): QuickUiBuilder;
        addSwitch(id: string, options: QuickUiSwitchOptionsConstructorOptions): QuickUiBuilder;
        addSwitch(id: string, label: string | null, defaultValue: string | null): QuickUiBuilder;

        addCheckbox(id: string): QuickUiBuilder;
        addCheckbox(id: string, options: QuickUiCheckboxOptions): QuickUiBuilder;
        addCheckbox(id: string, options: QuickUiCheckboxOptionsConstructorOptions): QuickUiBuilder;
        addCheckbox(
            id: string,
            label: string | null,
            options: string[] | null,
            displayOptions: string[] | null,
            defaultValue: string[] | null,
        ): QuickUiBuilder;

        addInput(id: string): QuickUiBuilder;
        addInput(id: string, options: QuickUiInputOptions): QuickUiBuilder;
        addInput(id: string, options: QuickUiInputOptionsConstructorOptions): QuickUiBuilder;
        addInput(id: string, label: string | null, defaultValue: string | null): QuickUiBuilder;

        addText(id: string): QuickUiBuilder;
        addText(id: string, options: QuickUiTextOptions): QuickUiBuilder;
        addText(id: string, options: QuickUiTextOptionsConstructorOptions): QuickUiBuilder;
        addText(id: string, value: string | null, fontSize: number | null, color: number | null): QuickUiBuilder;

        build(): QuickUi;
    }
}
