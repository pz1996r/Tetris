export const rotateBlock = (callback, shape) => {
    const iShape = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
    shape.forEach((el, i) => {
        el.forEach((item, j) => {
            iShape[j][shape.length - 1 - i] = item;
        })
    })
    callback(iShape);
}