// 변수 만들기

/** 13. 배열 생성한다.  */
const colorOptions = Array.from(
  // document.getElementsByClassName('color-option')자체는 배열이 아니라 HTMLCollection이기 때문에 이걸 JS배열로 만들어준다.
  document.getElementsByClassName('color-option'),
);
const color = document.getElementById('color');
const lineWidth = document.getElementById('line-width');
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
let isPainting = false;

// 캔버스 크기 지정하기
canvas.width = 800;
canvas.height = 800;

// 선 굵기 지정하기
ctx.lineWidth = lineWidth.value;

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
  /** 9. 새로운 path를 시작한다. */
  ctx.beginPath();
}

/** 8. 선의 굵기를 조절하는 함수를 만든다. */
function onLineWidthChange(event) {
  ctx.lineWidth = event.target.value;
}

/** 11. 유저가 선택한 선의 색상값을 받아와서 ctx를 변경한다. */
function onColorChange(event) {
  ctx.strokeStyle = event.target.value;
  ctx.fillStyle = event.target.value;
}

/** 13. dir로 객체의 모든 프로퍼티들을 볼 수 있다.
 * 그중 dataset 속성을 가져와 html에서 사용한 data-를 활용해 유저가 선택한 컬러값을 가져와 그값을 ctx에 넣어준다.  */
function onColorClick(event) {
  // data-color를 활용해 어떤 색상이 클릭되었는지 안다.
  //console.dir(event.target.dataset.color);
  const colorValue = event.target.dataset.color;
  ctx.strokeStyle = colorValue;
  ctx.fillStyle = colorValue;
  // 유저에게 선택한 색상을 알려준다.
  color.value = colorValue;
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

// 두가지 해결방법
// 1. canvas.addEventListener를 해주고 마우스가 떠났을 때를 감지한다.
// canvas.addEventListener('mouseleave', onMouseUp);
// 2. document에 mouseup 이벤트를 준다.
// document.canvas.addEventListener('mouseup', onMouseUp);

/** 6. 마우스가 canvas 밖으로 나갔다 들어올때 mouseleave로 떠났을때를 감지한다. */
canvas.addEventListener('mouseup', cancelPainting);
canvas.addEventListener('mouseleave', cancelPainting);

// 선의 굵기 수정
/** 7. input range가 올라가고 내려가는걸 알아차리는 이벤트리스너를 만든다. */
lineWidth.addEventListener('change', onLineWidthChange);

// 작은 버그
// 선의 굵기를 변경해서 다시 그리면 기존의 그렸던 선의 굵기로 바뀐다.
// ctx를 업데이트 했기때문이다.
// 해결방법 : 이전에 그려진 선과 새로운 선의 연결을 끊어줘야한다.

// 색상 선택
/** 10. input color에 이벤트리스너를 추가한다. */
color.addEventListener('change', onColorChange);

// 색상 제공
/** 12. 유저에게 미리 만들어진 색상을 클릭하면 바로 사용할 수 있도록 한다. */
// 각 color마다 이벤트리스너를 추가한다.
// color를 클릭할때마다 onColorClick 함수를 호출한다.
colorOptions.forEach(color => color.addEventListener('click', onColorClick));
