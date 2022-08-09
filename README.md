# Update-Carrot-game


## Dream Coding Ellie

![ezgif com-gif-maker](https://user-images.githubusercontent.com/73260460/183547423-54af641d-f0c7-421b-8cfe-6d63cf9c69e3.gif)


### Description
- 시간 내에 당근을 모두 잡기
- 벌레를 잡으면 죽음
- 시간을 초과해도 죽음
<hr/>



## What I have updated

![ezgif com-gif-maker (1)](https://user-images.githubusercontent.com/73260460/183547527-6bf932e8-3328-43c5-b4c6-65fc89608469.gif)

### Updated Description
- 레벨추가, 레벨에 따라 난이도가 올라감
- 벌레의 움직임 추가

#### move() 함수 만들기: 내가 함수를 만든 과정
정의: 함수 move()는 게임속 bug들이 field를 무자비하게 움직이며 당근을 클릭하는 것을 방해하는 역할을 한다.
분석: - 일정한 시간 간격으로 작업을 수행하는 것을 원하기 때문에 MOVEDURATION = 400;을 주고 setInterval 사용한다.
     - 화면 속에 나타나는 모든 bug의 요소를 가져온다.
     - 화면 속 bug들은 무작위로 화면에 나타나 돌아다닌다. 
        - carrot과 bug를 화면에 띄우려고 만든 randomNumber를 활용하여 돌아다닐 bug들을 랜덤으로 정해진 범위 사이에서 움직이게한다. 
     - 벌레들이 field 밖으로 나가지 않도록 설정해준다. 
        - carrot과 bug를 화면에 띄울때 field가 지정된 포지션과 범위 안에서 나타나도록하기 위해 만든 변수를 이용한다.
구조화: 
```
move() {
    const bugs = document.querySelectorAll(".bug");

    this.timer = setInterval(() => {
      bugs.forEach((bug) => {
        
        const x = randomNumber(-50, 50);
        const y = randomNumber(-50, 50);
        bug.style.transition = "all 2000ms ease";

        let fieldX = parseFloat(bug.style.left);
        fieldX += x;

        //bug shouldn't be out of windows
        if (fieldX > 0 && fieldX < this.x2) {
          bug.style.left = `${fieldX}px`;
        }

        let fieldY = parseFloat(bug.style.top);
        fieldY += y;

        //bug shouldn't be out of windows
        if (fieldY > 0 && fieldY < this.y2) {
          bug.style.top = `${fieldY}px`;
        }
      });
    }, MOVE_DURATION);
  }
  stopMove() {
    clearInterval(this.timer);
  }
}
```
       
#### 수정해야할 곳
- next level 올라갈 때 pop-up button과 message 바꾸기
- 게임에서 졌을 때 시간이 -1:-1로 뜨는 것

#### 추가하고싶은 내용
- 현재까지의 Best level이 몇 level인지?표시
- 현재 score 표시 // 당근을 잡으면 score가 올라가는 거롤 바꾸기
- 시간이 5초 이하로 남으면 경고음

