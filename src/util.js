function asset(filepath){
    var root = document.location.origin;
    return `${root}/assets/${filepath}`;
}

function image(filepath){
    return asset(`images/${filepath}`);
}

export{
    asset,
    image
}