/**
 * @requires that the element is attached to the document and therefore should be hidden (position = 'absolute', width = '1px', zIndex = '-1000', top = '0px', left = '0px')
 */
export function updateVideoElement(element, { src, autoplay, loop, muted, playbackRate, preservesPitch, volume, crossOrigin }) {
    if (src instanceof HTMLElement) {
        return;
    }
    element.playsInline = true;
    element.volume = volume ?? 1;
    element.preservesPitch = preservesPitch ?? true;
    element.playbackRate = playbackRate ?? 1;
    element.muted = muted ?? false;
    element.loop = loop ?? false;
    element.autoplay = autoplay ?? false;
    element.crossOrigin = crossOrigin ?? null;
    //update src
    if (src == null) {
        element.removeAttribute('src');
        element.removeAttribute('srcObject');
        return;
    }
    if (typeof src === 'string') {
        element.src = src;
    }
    else {
        element.srcObject = src;
    }
}
export function setupVideoElementInvalidation(element, invalidate) {
    let requestId;
    const callback = () => {
        invalidate();
        requestId = element.requestVideoFrameCallback(callback);
    };
    requestId = element.requestVideoFrameCallback(callback);
    return () => element.cancelVideoFrameCallback(requestId);
}
