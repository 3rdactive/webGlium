function openFullscreen() {
    var elem= canvas
  if (elem.requestFullscreen) {

    elem.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) { /* Safari */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) { /* IE11 */
    elem.msRequestFullscreen();
  }
}
function rectRect(r1x, r1y, r1w,r1h,r2x, r2y, r2w, r2h) {

  // are the sides of one rectangle touching the other?
  //console.log(`1x:${r1x} 1y:${r1y} 1w:${r1w} 1h:${r1h}`);
  //console.log(`2x:${r2x} 2y:${r2y} 2w:${r2w} 2h:${r2h}`);

  if (r1x + r1w >= r2x &&    // r1 right edge past r2 left
      r1x <= r2x + r2w &&    // r1 left edge past r2 right
      r1y + r1h >= r2y &&    // r1 top edge past r2 bottom
      r1y <= r2y + r2h) {    // r1 bottom edge past r2 top
        return true;
  }
  return false;
}