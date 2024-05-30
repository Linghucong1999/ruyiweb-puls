/**
 * 动画方法,将动画css加入到元素中,返回promise提供执行后续操作
 * @param $el 当前被执行动画的元素
 * @param animationList 动画列表
 * @param isDebugger 动画列表
 * @return {Promise<void>}
 */
export default async function runAnimation($el, animationList = [], isDebugger, callback) {
    const playFn = (animation) => {
        return new Promise(resolve => {
            $el.style.animationName = animation.type;
            $el.style.animationDuration = `${animation.duration}s`;

            // 如果是循环播放就将循环次数重置为1.这样有效避免编辑时因为预览循环播放动画无法触发animationend来暂停组件动画
            $el.style.animationIterationCount = animation.infinite ? (isDebugger ? 1 : 'infinite') : animation.interationCount;
            $el.style.animationDelay = `${animation.delay}`;
            $el.style.animationFillMode = 'both';
            const resolveFn = function () {
                $el.removeEventListener('animationend', resolveFn, false);
                $el.removeEventListener('animationcancel', resolveFn, false);
                resolve();
            };
            $el.addEventListener('animationend', resolveFn, false);
            $el.addEventListener('animationcancel', resolveFn, false);
        });
    };

    for (let i = 0; i < animationList.length; i++) {
        await playFn(animationList[i]);
    }
    if (callback) callback();
}