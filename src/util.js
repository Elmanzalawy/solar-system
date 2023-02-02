function dimensions() {
    return {
        width: window.innerWidth,
        height: window.innerHeight
    }
};

function asset(filepath) {
    var root = document.location.origin;
    return `${root}/assets/${filepath}`;
}

function image(filepath) {
    return asset(`images/${filepath}`);
}

export {
    dimensions,
    asset,
    image
}