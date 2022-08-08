'use strict';

export default class PopUp{
    constructor(){
        this.popUp = document.querySelector('.pop-up');
        this.popUpText = document.querySelector('.pop-up__message');
        this.popUpRefresh = document.querySelector('.pop-up__refresh');
        this.popUpRefresh.addEventListener('click', ()=>{
            this.onClick && this.onClick();
            this.hide();
        });
    }// constructor에서는 const가 아닌 this.로 할당해준다.

    setClickListener(onClick){
        this.onClick = onClick;
    };

    showWithText(text){
        this.popUpText.innerText = text ;
        this.popUp.classList.remove('pop-up--hide');
        };

    hide(){
        this.popUp.classList.add('pop-up--hide');
    };
};