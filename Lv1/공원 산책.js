function solution(park, routes) {
  let row = 0; // y
  let col = 0; // x

  // 시작 지점의 좌표를 먼저 구함 (row, col)
  park.forEach((line, i) => {
    if (line.includes("S")) {
      col = line.indexOf("S");
      row = i;
    }
  });

  for (const ch of routes) {
    const arr = ch.split(" ");
    const dir = arr[0]; // 방향(e, w, s, n)
    const squre = Number(arr[1]); // 이동 칸 수

    if (dir == "E" && col + squre < park[0].length) { // 좌측으로 이동 시, 이동 거리가 가로 길이를 벗어나면 안됨
      find = park[row].slice(col + 1, col + squre + 1); // 장애물 체크를 위해 이동 거리 칸을 가져옴
      if (find.includes("X")) continue; // X가 있는지 확인, 있으면 아무처리도 하지 않고 패스
      col += squre; // 이동 거리만큼 x좌표 더하기
    } else if (dir == "W" && col - squre >= 0) { // 우측으로 이동 시, 이동 거리가 가로 길이를 벗어나면 안됨
      find = park[row].slice(col - squre, col);
      if (find.includes("X")) continue;
      col -= squre;
    } else if (dir == "N" && row - squre >= 0) { // 상단으로 이동 시, 이동 거리가 세로 길이를 벗어나면 안됨
      let flag = false;
      for (let i = row - squre; i < row; i++) {
        if (park[i][col] === "X") flag = true;
      }
      if (flag) continue;
      row -= squre;
    } else if (dir == "S" && row + squre < park[0].length) { // 상단으로 이동 시, 이동 거리가 세로 길이를 벗어나면 안됨
      let flag = false;
      for (let i = row + 1; i <= row + squre; i++) {
        if (park[i][col] === "X") flag = true;
      }
      if (flag) continue;
      row += squre;
    }
  }

  return [row, col];
}

const park = ["SOO","OOO","OOO"]
const routes = ["E 2","S 2","W 1"];
const answer = solution(park, routes);
console.log(answer);

/* 문제 설명
    지나다니는 길을 'O', 장애물을 'X'로 나타낸 직사각형 격자 모양의 공원에서 로봇 강아지가 산책을 하려합니다.
    산책은 로봇 강아지에 미리 입력된 명령에 따라 진행하며, 명령은 다음과 같은 형식으로 주어집니다.
    ["방향 거리", "방향 거리" … ]
    예를 들어 "E 5"는 로봇 강아지가 현재 위치에서 동쪽으로 5칸 이동했다는 의미입니다. 로봇 강아지는 명령을 수행하기 전에 다음 두 가지를 먼저 확인합니다.

    주어진 방향으로 이동할 때 공원을 벗어나는지 확인합니다.
    주어진 방향으로 이동 중 장애물을 만나는지 확인합니다.
    위 두 가지중 어느 하나라도 해당된다면, 로봇 강아지는 해당 명령을 무시하고 다음 명령을 수행합니다.
    공원의 가로 길이가 W, 세로 길이가 H라고 할 때, 공원의 좌측 상단의 좌표는 (0, 0), 우측 하단의 좌표는 (H - 1, W - 1) 입니다.

    공원을 나타내는 문자열 배열 park, 로봇 강아지가 수행할 명령이 담긴 문자열 배열 routes가 매개변수로 주어질 때,
    로봇 강아지가 모든 명령을 수행 후 놓인 위치를 [세로 방향 좌표, 가로 방향 좌표] 순으로 배열에 담아 return 하도록
    solution 함수를 완성해주세요.

    입출력 예 1)
    park: ["SOO","OOO","OOO"]
    routes: ["E 2","S 2","W 1"]
    result: [2,1]

    입출력 예 2)
    park: ["SOO","OXX","OOO"]
    routes: ["E 2","S 2","W 1"]
    result: [0,1]

    입출력 예 3)
    park: ["OSO","OOO","OXO","OOO"]
    routes: ["E 2","S 3","W 1"]
    result: [0,0]
*/
