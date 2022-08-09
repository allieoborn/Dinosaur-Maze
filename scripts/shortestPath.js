

function bfs(node) {
    let search = [];
    let explored = new Set();
    search.push(node);

    explored.add(node);

    while (search.length != 0) {
        let t = search.pop();

        if (t.x == size-1 && t.y == size-1) {
            break;
        }

        let currentEdges = []
        if (t.edges.n) {
            currentEdges.push(t.edges.n);
        }
        if (t.edges.s) {
            currentEdges.push(t.edges.s);
        }
        if (t.edges.e) {
            currentEdges.push(t.edges.e);
        }
        if (t.edges.w) {
            currentEdges.push(t.edges.w);
        }
        

        currentEdges
        .filter(n => !explored.has(n))
        .forEach(n => {
            n.parent = t;
            explored.add(n);
            search.push(n);
        });
    }
}


function getPath(start, end, p=[]) {
    if (end.x == start.x && end.y == start.y) {
        return p;
    }
    if (end.parent.x == start.x && end.parent.y == start.y) {
        return p;
    } else {
        p.push(end.parent);
        return getPath(start, end.parent, p);
    }
}
