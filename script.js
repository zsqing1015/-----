function renderboard(numRows,numCols,grid){
    let boardEl=document.querySelector("#board");
    for (let i =0;i<numRows;i++){
        let trEl = document.createElement("tr")
        for (let j=0;j<numCols;j++){
            let cellEl=document.createElement("div"); 
            cellEl.className="cell";
            cellEl.innerText=grid[i][j];
            let tdEl=document.createElement("td");
            tdEl.append(cellEl);
            trEl.append(tdEl);
        }

        boardEl.append(trEl);
    }
}
let directions=[
    [-1,-1],[-1,0],[-1,1],
    [0,-1],[0,1],
    [1,-1],[1,0],[1,1],
]



function initialize(numRows,numCols,numMines){
    let grid=new Array(numRows);
    for(let i=0;i<numRows;i++){
        grid[i]=new Array(numCols);
        for(let j=0;j<numCols;j++){
            grid[i][j]=0;
        }
    }

    let mines=[];
    for(let k=0;k<numMines; k++){
        let cellSn=Math.trunc(Math.random()*numRows*numCols);
        
        let row=Math.trunc(cellSn/numCols);
        let col=cellSn%numCols;
        console.log(cellSn,row,);
        grid[row][col]=-1;
        mines.push([row,col]);
    }
    //计算有雷的周边为零的周边雷数
    for(let [row, col] of mines){
        for (let[drow,dcol] of directions){
            let cellRow=row+drow;
            let cellCol=col+dcol;
            if(cellRow<0 ||cellRow>=numRows ||cellCol<0||cellCol>=numCols){
                continue;
            }
            if (grid[cellRow][cellCol]===0){
                let count=0;
                for (let[arow,acol] of directions){
                    let ambientRow=cellRow+arow;
                    let ambientCol=cellCol+acol;
                    if(ambientRow<0 ||ambientRow>=numRows ||ambientCol<0||ambientCol>=numCols){
                        continue;
                    }
                
                    if(grid[cellRow+arow][cellCol+acol]===-1){
                        count +=1;

                    }
                }
                if(count>0){
                    grid[cellRow][cellCol]=count;
                }
            } 
            
        }
        
    }
    console.log(grid);
    return grid;
}
let grid=initialize(9,9,15);

renderboard(9,9,grid);
