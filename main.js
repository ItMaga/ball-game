(()=>{"use strict";const t=function(){function t(){}var e;return e=t,t.instance=document.getElementById("canvas"),t.context=e.instance.getContext("2d"),t.width=e.instance.width,t.height=e.instance.height,t}();var e,i;!function(t){t.ArrowRight="ArrowRight",t.ArrowLeft="ArrowLeft",t.ArrowUp="ArrowUp",t.ArrowDown="ArrowDown"}(e||(e={})),function(t){t[t.INACTIVE=0]="INACTIVE",t[t.ACTIVE=1]="ACTIVE"}(i||(i={}));const n=function(){function i(){this.transform=t.width/2-35,this.directions=new Set,this.availableDirections=[e.ArrowRight,e.ArrowLeft],this.y=t.height-12,document.addEventListener("keydown",this.keyDownListener.bind(this),!1),document.addEventListener("keyup",this.keyUpListener.bind(this),!1)}return Object.defineProperty(i.prototype,"playerCoordinates",{get:function(){return{x1:this.transform,x2:this.transform+70,y1:this.y,y2:this.y+12}},enumerable:!1,configurable:!0}),i.prototype.keyDownListener=function(t){this.availableDirections.includes(t.code)&&(t.preventDefault(),this.directions.add(t.code))},i.prototype.keyUpListener=function(t){this.directions.has(t.code)&&this.directions.delete(t.code)},i.prototype.loopCallback=function(){this.drawPlayer()},i.prototype.drawPlayer=function(){this.directions.has(e.ArrowRight)&&this.transform<t.width-70?this.transform+=10:this.directions.has(e.ArrowLeft)&&this.transform>0&&(this.transform-=10),t.context.fillStyle="white",t.context.fillRect(this.transform,this.y,70,12)},i}();var o=function(){return o=Object.assign||function(t){for(var e,i=1,n=arguments.length;i<n;i++)for(var o in e=arguments[i])Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=e[o]);return t},o.apply(this,arguments)};const s=function(){function e(e,i){this.cells=[],this.cellsOnLine=Math.round(t.width/50),this.initCells(),this.score=e,this.playerWin=i}return e.prototype.loopCallback=function(){this.drawCells()},e.prototype.inactivateCell=function(t,e){this.cells.splice(t,1,o(o({},e),{status:i.INACTIVE})),this.score.increment(),this.hasActiveCells||this.playerWin()},Object.defineProperty(e.prototype,"hasActiveCells",{get:function(){var t=this.cells.filter((function(t){return t.status===i.ACTIVE}));return Boolean(t.length)},enumerable:!1,configurable:!0}),e.prototype.initCells=function(){for(var t=0;t<3;t++)for(var e=0;e<this.cellsOnLine;e++){var n=50*e,o=12*t;this.pushCell({x1:n,x2:n+50,y1:o,y2:o+12,status:Math.random()<.4?i.ACTIVE:i.INACTIVE})}},e.prototype.drawCells=function(){this.cells.forEach((function(e){var n=e.x1,o=e.y1;e.status===i.ACTIVE&&(t.context.fillStyle="white",t.context.rect(n,o,50,12),t.context.fill(),t.context.stroke())}))},e.prototype.pushCell=function(t){this.cells.push(t)},e}(),r=function(){function e(e,i,n){this.x=Math.round(t.width/2),this.y=Math.round(t.height-30),this.dx=2,this.dy=-2,this.cells=e,this.player=i,this.gameOver=n}return e.prototype.loopCallback=function(){this.drawBall(),this.detectCollision();var e=this.x+this.dx,i=this.y+this.dy;(e>t.width-8||e<8)&&(this.dx=-this.dx),i<8||this.isPlayerCollision?this.dy=-this.dy:i>t.height-8&&this.gameOver(),this.x+=this.dx,this.y+=this.dy},Object.defineProperty(e.prototype,"isPlayerCollision",{get:function(){var t=this.player.playerCoordinates,e=t.x1,i=t.x2,n=t.y1,o=t.y2;return this.x+8>e&&this.x+8<i&&this.y+8>n&&this.y+8<o},enumerable:!1,configurable:!0}),e.prototype.detectCollision=function(){var t=this,e=this.cells.cells.findIndex((function(e){return e.status===i.ACTIVE&&t.y+8>e.y1&&t.y-8<e.y2&&t.x+8>e.x1&&t.x-8<e.x2}));return e>=0&&(this.dy=-this.dy,this.cells.inactivateCell(e,this.cells.cells[e]),!0)},e.prototype.drawBall=function(){t.context.beginPath(),t.context.arc(this.x,this.y,8,0,2*Math.PI),t.context.fill(),t.context.closePath()},e}(),c=function(){function t(t,e){this.RAFId=0,this.lastTime=0,this.delay=t,this.callback=e}return t.prototype.RAFHandler=function(t){this.RAFId=window.requestAnimationFrame(this.RAFHandler.bind(this)),t-this.lastTime<this.delay||(this.lastTime=t,this.callback())},t.prototype.start=function(){this.RAFId=window.requestAnimationFrame(this.RAFHandler.bind(this))},t.prototype.stop=function(){window.cancelAnimationFrame(this.RAFId)},t}(),l=function(){function t(){this.scoreElement=document.getElementById("score"),this.score=0}return t.prototype.increment=function(){this.score+=10,this.updateScore()},t.prototype.reset=function(){this.score=0,this.updateScore()},t.prototype.updateScore=function(){this.scoreElement.innerText=String(this.score)},t}(),a=function(){function e(){}return e.drawGameOverScreen=function(){t.context.font="48px serif",t.context.textAlign="center",t.context.textBaseline="middle",t.context.fillText("GAME OVER",t.width/2,t.height/2)},e.drawPlayerWinScreen=function(){t.context.font="48px serif",t.context.textAlign="center",t.context.textBaseline="middle",t.context.fillText("WIN!",t.width/2,t.height/2)},e}();new(function(){function e(){this.score=new l,this.cells=new s(this.score,this.playerWin.bind(this)),this.player=new n,this.ball=new r(this.cells,this.player,this.gameOver.bind(this)),this.gameLoop=new c(10,this.gameLoopCallback.bind(this)),this.gameLoop.start()}return e.clearCanvas=function(){t.context.clearRect(0,0,t.width,t.height)},e.prototype.gameOver=function(){this.gameLoop.stop(),this.score.reset(),setTimeout((function(){e.clearCanvas(),a.drawGameOverScreen()}))},e.prototype.playerWin=function(){this.gameLoop.stop(),setTimeout((function(){e.clearCanvas(),a.drawPlayerWinScreen()}))},e.prototype.gameLoopCallback=function(){e.clearCanvas(),this.ball.loopCallback(),this.player.loopCallback(),this.cells.loopCallback()},e}()),console.log("Hello World!")})();