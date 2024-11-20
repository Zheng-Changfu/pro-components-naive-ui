export function useDragModal(draggableEl, childrenSelectors = '.n-card-header') {
  const targetEl = draggableEl.querySelector(childrenSelectors)
  targetEl.style.cursor = 'move'
  mousedown(targetEl, draggableEl)
}

function mousedown(targetEl, draggableEl) {
  targetEl.onmousedown = (event) => {
    const viewportWidth = window.innerWidth
    const viewportHeight = window.innerHeight

    const {
      width,
      height,
      x: minMoveX,
      y: minMoveY,
    } = draggableEl.getBoundingClientRect()

    const maxMoveX = viewportWidth - width - minMoveX
    const maxMoveY = viewportHeight - height - minMoveY

    const { clientX: originX, clientY: originY } = event
    const { left, top } = draggableEl.style
    // getComputedStyle
    const styleLeft = left?.replace('px', '') ?? 0
    const styleTop = top.replace('px', '') ?? 0

    document.onmousemove = (e) => {
      const { clientX, clientY } = e
      let moveX = clientX - originX
      let moveY = clientY - originY
      if (moveX > maxMoveX) {
        moveX = maxMoveX
      }
      else if (-moveX > minMoveX) {
        moveX = -minMoveX
      }
      if (moveY > maxMoveY) {
        moveY = maxMoveY
      }
      else if (-moveY > minMoveY) {
        moveY = -minMoveY
      }

      draggableEl.style.cssText += `left:${+styleLeft + moveX} px; top:${+styleTop + moveY} px`
    }
  }
}
