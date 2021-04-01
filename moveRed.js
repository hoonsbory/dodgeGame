const moveRed = () => {
    if (left) {
        if (up) {
            x -= 5
            y -= 5
        }
        else if (down) {
            x -= 5
            y += 5
        }
        else x -= 5
    }
    else if (right) {
        if (up) {
            x += 5
            y -= 5
        }
        else if (down) {
            x += 5
            y += 5
        }
        else x += 5
    }
    else if (down) y += 5
    else if (up) y -= 5
}

export default moveRed
