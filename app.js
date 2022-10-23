// 변수 만들기
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

// 캔버스 크기 지정하기
canvas.width = 800;
canvas.height = 800;

// 선 굵기 지정하기
ctx.lineWidth = 2;

/** 3. 변수를 만들어준다. */
let isPainting = false;

function onMove(event) {
  /** 4. 유저가 마우스를 움직이고 isPainting이 true일때 선을 그리도록 한다. */
  if (isPainting) {
    ctx.lineTo(event.offsetX, event.offsetY);
    ctx.stroke();
    return;
  }
  /** 5.만약 isPainting이 false이면 연필을 움직이기만 한다. */
  ctx.moveTo(event.offsetX, event.offsetY);
}

function startPainting() {
  isPainting = true;
}
function cancelPainting() {
  isPainting = false;
}

/** 1. 유저가 canvas위에서 마우스를 움직일 때마다 moveTo를 호출한다. */
canvas.addEventListener('mousemove', onMove);

// click: 마우스를 눌렀다가 뗐을 때.
// mousedown: 마우스를 누른채로 있는 것.
/** 2. 유저가 mousedown할때, 클릭한 곳에서부터 선을 그리기 시작한다. */
canvas.addEventListener('mousedown', startPainting);

// 작은 버그
// canvas의 끝까지 움직이고 canvas밖으로 나갔다 다시 들어올때, 여전히 그림을 그리고 있다.
// canvas 밖으로 나갈때까지 마우스를 누른상태로 있기 떄문이다. => painting이 true인 상태이다.

// 두가지 방법
// 1. canvas.addEventListener를 해주고 마우스가 떠났을 때를 감지한다.
// canvas.addEventListener('mouseleave', onMouseUp);
// 2. document에 mouseup 이벤트를 준다.
// document.canvas.addEventListener('mouseup', onMouseUp);

/** 6. 마우스가 canvas 밖으로 나갔다 들어올때 mouseleave로 떠났을때를 감지한다. */
canvas.addEventListener('mouseup', cancelPainting);
canvas.addEventListener('mouseleave', cancelPainting);
