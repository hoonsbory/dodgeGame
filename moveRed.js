const moveRed = () => {
    if (left) {
        if (up) {
            if (y <= 0 && x <= 0) return
            else if (y <= 0) x -= mainSpeed
            else if (x <= 0) y -= mainSpeed
            else {
                x -= mainSpeed
                y -= mainSpeed
            }
        }
        else if (down) {
            if (y >= canvas.height-20 && x <= 0) return
            else if (y >= canvas.height-20) x -= mainSpeed
            else if (x <= 0) y += mainSpeed
            else {
                x -= mainSpeed
                y += mainSpeed
            }
        }
        else {
            if (x <= 0) return
            else
                x -= mainSpeed
        }
    }
    else if (right) {
        if (up) {
            if (y <= 0 && x >= canvas.width-20) return
            else if (y <= 0) x += mainSpeed
            else if (x >= canvas.width-20) y -= mainSpeed
            else {
                x += mainSpeed
                y -= mainSpeed
            }
        }
        else if (down) {
            if (y >= canvas.height-20 && x >= canvas.width-20) return
            else if (y >= canvas.height-20) x += mainSpeed
            else if (x >= canvas.width-20) y += mainSpeed
            else {
                x += mainSpeed
                y += mainSpeed
            }
        }
        else {
            if (x >= canvas.width - 20) return
            else
                x += mainSpeed
        }
    }
    else if (down) {
        if (y >= canvas.height - 20) return
        else y += mainSpeed
    }
    else if (up) {
        if (y <= 0) return
        else y -= mainSpeed
    }
}

export default moveRed
