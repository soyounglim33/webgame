let tbody = document.querySelector('table tbody');
let dataset = [];

document.querySelector('#exc').addEventListener('click',function(){
    tbody.innerHTML = '';
    let hor = document.querySelector('#hor').value;
    let ver = document.querySelector('#ver').value;
    let mine = document.querySelector('#mine').value;
    console.log(hor,ver,mine);

    //0부터 99까지 배열 만듬
    let list = Array(hor * ver).fill().map(function(el,index){
        return index;
    });

    //셔플에 값을 하나씩 뽑아서 넣음 (지뢰 위치 뽑기)
    let suffle = [];
    while(list.length > (hor * ver - mine)){
        let move = list.splice(Math.floor(Math.random() * list.length), 1)[0];
        suffle.push(move);
    }
    console.log(suffle);


    for(let i = 0; i < ver; i++){
        let arr = [];
        let tr = document.createElement('tr');
        dataset.push(arr);
        for(let j = 0; j < hor; j++){
            let td = document.createElement('td');
            td.addEventListener('contextmenu', function(e){
                e.preventDefault();
                // console.log('우클릭');
                let 부모tr = e.currentTarget.parentNode;
                let 부모tbody = e.currentTarget.parentNode.parentNode;
                let 칸 = Array.prototype.indexOf.call(부모tr.children, e.currentTarget);  
                let 줄 = Array.prototype.indexOf.call(부모tbody.children, e.currentTarget.parentNode);  
                console.log(줄, 칸);
                if(e.currentTarget.textContent === '' || e.currentTarget.textContent === 'x'){
                    e.currentTarget.textContent = '!';
                }else if(e.currentTarget.textContent === '!'){
                    e.currentTarget.textContent = '?';
                }else if(e.currentTarget.textContent === "?"){
                    if(dataset[줄][칸] === 1){
                        e.currentTarget.textContent = '';
                    }else if(dataset[줄][칸] === 'x'){
                        e.currentTarget.textContent = 'x';
                    }
                }
                // console.log(dataset);
            });
            td.addEventListener('click', function(e){
                //클릭했을때 주변 지뢰 개수
                let 부모tr = e.currentTarget.parentNode;
                let 부모tbody = e.currentTarget.parentNode.parentNode;
                let 칸 = Array.prototype.indexOf.call(부모tr.children, e.currentTarget);  
                let 줄 = Array.prototype.indexOf.call(부모tbody.children, e.currentTarget.parentNode);  
                if(dataset[줄][칸] === 'x'){
                    e.currentTarget.textContent = '펑!';
                }else{
                    let 주변 = [                       
                        dataset[줄][칸-1],                    , dataset[줄][칸+1],
                    ];
                    if(dataset[줄-1]){
                        주변 = 주변.concat([dataset[줄-1][칸-1], dataset[줄-1][칸], dataset[줄-1][칸+1]]);
                    }else if(dataset[줄+1]){
                        주변 = 주변.concat([dataset[줄+1][칸-1], dataset[줄+1][칸], dataset[줄+1][칸+1]]);
                    }
                    console.log(주변);
                    e.currentTarget.textContent = 주변.filter(function(v){
                        return v === 'x';
                    }).length;
                }
            });
            arr.push(1);
            tr.appendChild(td);
            // td.textContent = 1;
        }
        tbody.appendChild(tr);
    }
    // console.log(dataset);

    //지뢰 심기
    for (let k=0; k < suffle.length; k++){       // 예 60
        let ve = Math.floor(suffle[k] / 10 );   // 6줄 
        let ho = suffle[k] % 10;                // 0칸 
        console.log(ve,ho);
        tbody.children[ve].children[ho].textContent = 'x';
        dataset[ve][ho] = 'x';
    }
    console.log(dataset);
});

