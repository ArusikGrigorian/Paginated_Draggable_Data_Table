function getDropTarget(tbody, y) {
    let dropByTrs = Array.from(tbody.querySelectorAll(".draggable:not(.mover)"));
   
    let reduced = dropByTrs.reduce((initial, el) => {
        let tr = el.getBoundingClientRect();
        let offset = y - tr.top - tr.height / 2;

        if(offset < 0 && offset > initial.offset) {
            return {
                offset : offset,
                dropBy : el,
            };
        } else {
            return initial;
        }
    }, {offset : Number.NEGATIVE_INFINITY});

    return reduced.dropBy;
};


export default getDropTarget;