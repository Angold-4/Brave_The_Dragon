;window.onload = function(){
    function $(idName){
        return document.getElementById(idName);
    }
    var gameEnter = $("gameEnter")
    var Dragon = $("Dragon")
    var Warrior = $("warrior")
    var FireBullets = $('FireBullets')
    var Blood1 = $('Blood1')
    var Blood2 = $('Blood2')
    var Blood3 = $('Blood3')
    var Blood4 = $('Blood4')
    var Blood5 = $('Blood5')
    var Blood6 = $('Blood6')
    var Blood7 = $('Blood7')
    var Blood8 = $('Blood8')
    var shot = true
    var bulletSet = []
    var fly = 0
    var status = true
    var WarriorBlood = 4;


    document.onkeyup = function(evt){
        var e = evt || window.event;
        var c = e.keyCode;
        if(c == 66){
            DmoveL()
        }
        else if(c == 77){
            DmoveR()
        }
        else if(c == 78){
            Dfly(status)
            if(fly >= 100){
                status = false
                Blood4.style.display = "none"
            }if(fly == 25){
                Blood1.style.display = "none"
            }if(fly == 50){
                Blood2.style.display = "none"
            }if(fly == 75){
                Blood3.style.display = "none"
            }
            fly = fly + 1

        }
        else if(c == 81){
            WmoveL()
        }
        else if(c == 69){
            WmoveR()
        }
        else if(c == 72){
            if(shot){
                CreateFireBullet()
                shot = false
            }else{
                shot = true
            }
        }


    }
    function getStyle(ele, attr){
        var res = null
        if(ele.currentStyle){
            res = elecurrentstyle[attr];
        }else{
            res = window.getComputedStyle(ele,null)[attr];
        }
        return parseFloat(res)
    }

    function DmoveL(){
        var WL = getStyle(Warrior, 'left')
        var WT = getStyle(Warrior, 'top')
        var DL = getStyle(Dragon, 'left')
        var DT = getStyle(Dragon, 'top')

        var speed = -5
        Dragon.style['left'] = DL + speed + 'px'
        judgement(WL, WT, DL, DT)
    }

    function DmoveR(){
        var speed = 5
        var WL = getStyle(Warrior, 'left')
        var WT = getStyle(Warrior, 'top')
        var DL = getStyle(Dragon, 'left')
        var DT = getStyle(Dragon, 'top')

        var DL = getStyle(Dragon, 'left')
        if(DL >= 500){
            Dragon.style['left'] = 500;
        }else{
            Dragon.style['left'] = DL + speed + 'px'
        }
        judgement(WL, WT, DL, DT)
    }

    function Dfly(flag){
        var WL = getStyle(Warrior, 'left')
        var WT = getStyle(Warrior, 'top')
        var DL = getStyle(Dragon, 'left')
        var DT = getStyle(Dragon, 'top')
        var flyheight = 30
        var flyend = getStyle(Dragon, "top") - flyheight
        var speed = -1
        if(Dragon.timer){
            clearInterval(Dragon.timer)
            delete Dragon.timer
        }
        Dragon.timer = setInterval(function(){
            var moveVal = getStyle(Dragon, 'top');
            if(moveVal <= 0){speed = 1.8}
            if(moveVal == flyend){
                speed = 1.8;
                Dragon.style['top'] = moveVal + speed + "px"

            }else if(flag){
                Dragon.style['top'] = Math.min(400, moveVal + speed) + "px"
                if (moveVal >= 400){
                    clearInterval(Dragon.timer);
                    delete Dragon.timer
                }
            }
            else{
                speed = 1.8
                Dragon.style['top'] = moveVal + speed + "px"
                if (moveVal >= 400){
                    clearInterval(Dragon.timer);
                    Dragon.style['top'] = 400 + "px"
                    delete Dragon.timer
                }
            }
            judgement(WL, WT, DL, DT)
        },10);
    }

    function WmoveL(){
        var speed = -10
        var WL = getStyle(Warrior, 'left')
        var WT = getStyle(Warrior, 'top')
        var DL = getStyle(Dragon, 'left')
        var DT = getStyle(Dragon, 'top')
        if(WL <= 0){
            Warrior.style['left'] = 0
        }else{
            Warrior.style['left'] = WL + speed + "px"
        }
        judgement(WL, WT, DL, DT)

    }

    function WmoveR(){
        var speed = 10
        var WL = getStyle(Warrior, 'left')
        var WT = getStyle(Warrior, 'top')
        var DL = getStyle(Dragon, 'left')
        var DT = getStyle(Dragon, 'top')

        if(WL >= 500){
            Warrior.style['left'] = 500
        }else{
            Warrior.style['left'] = WL + speed + "px"
        }
        judgement(WL, WT, DL, DT)


    }

    function CreateFireBullet(){
        var bullet = new Image(15,15);
        bullet.src = 'bullets.gif'
        bullet.className = "b"
        var WL = getStyle(Warrior,'left')
        var DL = getStyle(Dragon, 'left')
        var DT = getStyle(Dragon, 'top')
        bullet.style.left = DL + "px";
        bullet.style.top = DT + 50 + "px"
        FireBullets.appendChild(bullet);
        bulletSet.push(bullet);
        move(bullet)
    }

    function move(ele){
        var speedL = -1
        ele.timer = setInterval(function(){
            var BL = getStyle(ele, 'left')
            var WL = getStyle(Warrior, 'left')
            var WT = getStyle(Warrior, 'top')
            var BT = getStyle(ele, 'top')
            var t1 = 0
            var t2 = 0.01
            if(BL < WL + 100 && BL > WL && BT > WT - 15 && BT < WT + 85){
                if(WarriorBlood == 4){
                    Blood8.style.display = "none"
                    clears(ele)
                }if(WarriorBlood == 3){
                    Blood7.style.display = "none"
                    clears(ele)
                }if(WarriorBlood == 2){
                    Blood6.style.display = "none"
                    clears(ele)
                }if(WarriorBlood == 1){
                    Blood5.style.display = "none"
                    alert("Bomb!!")
                    clear(ele)
                }
                WarriorBlood = WarriorBlood - 1

            }
            else if(BT >= 500 || BL <= 0){
                clearInterval(ele.timer)
                ele.parentNode.removeChild(ele)
                bulletSet.splice(0,1);
            }else{
                ele.style['left'] = BL + speedL + "px"
                ele.style['top'] = BT + parseFloat(100*(t1 + t2)) + "px"
            }
            t1 = t1 + 0.01
            t2 = t2 + 0.01
        },10);
    }

    function clear(ele){
        shot = true
        Warrior.style['left'] = 100 + 'px'
        Dragon.style['left'] = 400 + 'px'
        Dragon.style['bottom'] = 0 + 'px'
        Warrior.style['bottom'] = 0 + 'px'
        clearInterval(ele.timer)
        ele.parentNode.removeChild(ele)
        bulletSet.splice(0,1)
        fly = 0
        WarriorBlood = 4;
        if(fly == 0){
            Blood1.style.display = "block"
            Blood2.style.display = "block"
            Blood3.style.display = "block"
            Blood4.style.display = "block"
        }
        if(WarriorBlood == 4){
            Blood5.style.display = "block"
            Blood6.style.display = "block"
            Blood7.style.display = "block"
            Blood8.style.display = "block"
        }
    }

    function judgement(wl, wt, dl, dt, ele){
        if(dl < wl + 100 && dl > wl + 50 && dt + 100 > wt){
            alert("King!")
            clean()
        }
    }

    function clean(){
        Warrior.style['left'] = 100 + 'px'
        Dragon.style['left'] = 400 + 'px'
        Dragon.style['bottom'] = 0 + 'px'
        Warrior.style['bottom'] = 0 + 'px'
        bulletSet = []
    }
    function clears(ele){
        clearInterval(ele.timer)
        ele.parentNode.removeChild(ele)
        bulletSet.splice(0,1);
    }










































}
