'use strict';

import * as sound from './sound.js';

const CARROT_SIZE = 80;

export const ItemType =Object.freeze({
    carrot:'carrot',
    bug: 'bug',
});

export class Field {

    constructor(carrotCount, bugCount){
        this.carrotCount = carrotCount;
        this.bugCount = bugCount;
        this.field = document.querySelector('.game__field');
        this.fieldRect = this.field.getBoundingClientRect();
        //this.onClick = this.onClick.bind(this); //this Binding 1
        this.field.addEventListener('click',this.onClick); //('click', (event) => this.onClick(event)); this binding 2
    }
    
    init(){
        this.field.innerHTML ='';
        //벌레와 당근을 생성한 뒤 field에 추가해줌
        this._addItem('carrot', this.carrotCount, 'carrot/img/carrot.png');
        this._addItem('bug', this.bugCount,'carrot/img/bug.png');
    }
    setClickListener(onItemClick){
        this.onItemClick = onItemClick;
    }
    _addItem(className, count, imgPath){ //__underscore을 씀으로 인해 외부에서 이 함수를 쓸 수 없음
        //클래스의 이름과 개수 그리고 이미지의 경로를 추가해준다.
        const x1 = 0;
        const y1 = 0;
        const x2= this.fieldRect.width - CARROT_SIZE;
        const y2 = this.fieldRect.height - CARROT_SIZE;
        for(let i = 0; i<count; i++){
            const item = document.createElement('img');
            item.setAttribute('class', className);
            item.setAttribute('src', imgPath); 
            item.style.position = 'absolute';
            const x = randomNumber(x1, x2);
            const y = randomNumber(y1, y2);
            item.style.left = `${x}px`;
            item.style.top = `${y}px`;
            this.field.appendChild(item);
        }
    }
    onClick = event => { //this binding 3
        const target = event.target;
        if(target.matches('.carrot')){
        //당근!
            target.remove();
            sound.playCarrot();
            this.onItemClick && this.onItemClick('carrot');
        } else if(target.matches('.bug')){
        //벌레!
            this.onItemClick && this.onItemClick('bug');
            
        }
    }
}

function randomNumber(min, max){
    return Math.random() * (max - min) + min;
}
