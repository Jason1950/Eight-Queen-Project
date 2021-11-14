
    import * as THREE from './build/three.module.js';
    import { OrbitControls } from './jsm/controls/OrbitControls.js';
    import { FBXLoader } from './jsm/loaders/FBXLoader.js';
    import { OBJLoader } from './jsm/loaders/OBJLoader.js';
    // *** webgl variable *** //
    let camera, scene, renderer;
    const clock = new THREE.Clock();

    var canvas;
    let controls;
    let skytexture;
    const resizePara = 1; //4/5;

    const size4AnsArray = [[1, 3, 0, 2],
    [2, 0, 3, 1]]
    console.log(size4AnsArray[1])

    let chessSize=4;


    let showCase = 0;

    const loaderimg0 = new THREE.TextureLoader();
    const bgTexture = loaderimg0.load('./3dfile/bg.png');
    
    let queenAnsArray = queens(chessSize)
    console.log('queenAnsArray Ans for 4 : ',queenAnsArray);

    // model
    const loader = new FBXLoader();

    init(4,queenAnsArray[0]);
    animate();

    function init(chessSize=4,arrayAns) {

        camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 1000 );
        camera.position.set( 200, 200, 200 );
        scene = new THREE.Scene();
        const BACKGROUND_COLOR = 0xf1f1f1;
        // scene.background = new THREE.Color( 0xf5c1bd );
        // scene.background = new THREE.Color( 0xa0a0a0 );
        scene.fog = new THREE.Fog( 0xa0a0a0, 200, 1000 );

        // Set background
        // const canvasAspect = canvas.clientWidth / canvas.clientHeight;
        // const imageAspect = bgTexture.image ? bgTexture.image.width / bgTexture.image.height : 1;
        // let aspect = imageAspect / canvasAspect;
        // aspect = aspect*2.5
        // bgTexture.offset.x = aspect > 1 ? (1 - 1 / aspect) / 2 : 0;
        // bgTexture.repeat.x = aspect > 1 ? 1 / aspect : 1;
        
        // bgTexture.offset.y = aspect > 1 ? 0 : (1 - aspect) / 2;
        // bgTexture.repeat.y = aspect > 1 ? 1 : aspect;
        scene.background = bgTexture;
        canvas = document.getElementById("main3-canvas");


        
        // let skyboxGeo = new THREE.BoxGeometry(2000, 900, 1000);
        // skytexture = new THREE.MeshBasicMaterial(
        //     {   map: bgTexture, 
        //         side: THREE.BackSide,
        //         transparent: true, 
        //         opacity: 1 });
        // let skybox = new THREE.Mesh(skyboxGeo, skytexture );
        // skybox.name = "boxbg";
        // scene.add(skybox);

        const hemiLight = new THREE.HemisphereLight( 0xffffff, 0x444444 ,0.7);
        hemiLight.position.set( 0, 200, 0 );
        scene.add( hemiLight );

        const dirLight = new THREE.DirectionalLight( 0xffffff );
        dirLight.position.set( 0, 200, 100 );
        dirLight.castShadow = true;
        dirLight.shadow.camera.top = 180;
        dirLight.shadow.camera.bottom = - 100;
        dirLight.shadow.camera.left = - 120;
        dirLight.shadow.camera.right = 120;
        scene.add( dirLight );
        // scene.add( new THREE.CameraHelper( dirLight.shadow.camera ) );


        const AllGroup = new THREE.Group();


        // ******************************************* //
        //                                             //
        //                 棋盤  init                  //
        //                                             //
        // ******************************************* //

        const chessGroup = new THREE.Group();
        const cubeSize = 50;
        
        let tempMesh
        // let chessSize = 5
        let chessFoolrColor = 'w'
        let startColor = true;
        for(let i=0;i<chessSize;i++){
            if (i%2==0) startColor = true
            else startColor = false
            for(let j=0;j<chessSize;j++){
                startColor = !startColor

                if (startColor){
                    chessFoolrColor ='w'
                }else{
                    chessFoolrColor ='b'
                }
                // console.log('startColor :',startColor ,' , chessFoolrColor:',chessFoolrColor)
                tempMesh = addMesh(i,j,chessFoolrColor)
                chessGroup.add(tempMesh);
            }
        }

        

        function addMesh(row=0, col=0, color='b'){
            let c;
            if (color == 'b'){
                c = 0xE0E0E0
            }else if(color=='w'){
                c = 0x000000
            }
            const mesh3 = new THREE.Mesh( new THREE.BoxGeometry( cubeSize, cubeSize, 10 ), new THREE.MeshPhongMaterial( { color: c, depthWrite: true } ) );            
            mesh3.rotation.x = - Math.PI / 2;
            mesh3.position.z -= cubeSize*row;
            mesh3.position.x += cubeSize*col;
            // mesh3.receiveShadow = true;
            return mesh3
        }



        
        // ******************************************* //
        //                                             //
        //             棋子 fbx  init                  //
        //                                             //
        // ******************************************* //
        
        const group = new THREE.Group();
        loader.load( './3dfile/woodChessFBX.fbx', function ( object ) {
            // **** texture loading **** //
            const man_txt = new THREE.TextureLoader().load('./3dfile/WoodenChessQueen.jpg');
            man_txt.flipY = true; // we flip the texture so that its the right way up
            const man_mtl = new THREE.MeshPhongMaterial({
                map: man_txt,
                color: 0xffffff,
                skinning: true
            });

           
            object.traverse( function ( child ) {
                if ( child.isMesh ) {
                    child.castShadow = true;
                    child.receiveShadow = true;
                    child.material = man_mtl;
                }
            } );


            object.scale.multiplyScalar(0.05);
            let sartState = true;
            // console.log(arrayAns.length);
            if(!(arrayAns===undefined))
            {    for(let i=0;i<chessSize;i++){
                    if (i%2==0) sartState = true
                    else sartState = false
                    sartState = !sartState;
                    for(let j=0;j<chessSize;j++){
                        let tempOBJ = object.clone();
                        tempOBJ.position.z -= cubeSize*i;
                        tempOBJ.position.x += cubeSize*j;              
                        // if (sartState) group.add( tempOBJ );
                        
                        if (Math.abs(chessSize-arrayAns[i])==j){
                        group.add( tempOBJ );}
                        // size4AnsArray[1]
                        sartState =! sartState
                    }
                }}
        } );

        chessGroup.name = 'chessFloorGroup';


        // console.log(chessGroup)
        chessGroup.position.x -= cubeSize*chessSize/2 -cubeSize/2;
        chessGroup.position.z += cubeSize*chessSize/2 -cubeSize/2;

        group.position.x -= cubeSize*chessSize/2 -cubeSize/2;
        group.position.z += cubeSize*chessSize/2 -cubeSize/2;
        group.name = 'chessQueenAll';
        AllGroup.add(chessGroup)
        AllGroup.add(group)

        AllGroup.name = 'allGroup'
        AllGroup.position.y += 30
        scene.add(AllGroup)



        const grid = new THREE.GridHelper( 200, 2, 0x000000, 0x000000 );
        grid.material.opacity = 0.8;
        grid.material.transparent = true;
        grid.position.y +=5;
        // scene.add( grid );


        // ---------------- 綁定 canvas 為 自己指定的element !! --------------- //
        renderer = new THREE.WebGLRenderer({ canvas: canvas,antialias: true });
        renderer.setPixelRatio( window.devicePixelRatio );
        renderer.setSize( window.innerWidth*resizePara, window.innerHeight*resizePara );
        renderer.shadowMap.enabled = true;


        // **** controls 畫面縮放控制 **** //
        controls = new OrbitControls( camera, renderer.domElement );
        controls.maxPolarAngle =  Math.PI / 2 - 0.11;
        controls.minPolarAngle =  Math.PI / 3 - 0.15;
        // controls.maxAzimuthAngle = Math.PI  ;   // from 120 ~ -180 degree 
        // controls.minAzimuthAngle = -Math.PI *2/3 ;
        controls.enableZoom = false;
        controls.dampingFactor = 0.1;
        controls.target.set( 0, 100, 0 );
        console.log(controls)
        controls.update();
        window.addEventListener( 'resize', onWindowResize );
        document.addEventListener("keydown", onDocumentKeyDown, false);
    }

    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize( window.innerWidth*resizePara, window.innerHeight*resizePara );
    }

    function animate() {

        const delta = clock.getDelta();
        const CQA = scene.getObjectByName( "allGroup" );
        // const CFG = scene.getObjectByName( "chessFloorGroup" );
        CQA.rotation.y += 0.003
        // CFG.rotation.y += 0.01    

        requestAnimationFrame( animate );


        renderer.render( scene, camera );
    }




    // ******************************************************* //
    //                                                         //
    //                 queens functions                        //
    //                                                         //
    // ******************************************************* //

    function queens(boarderSize) {
        // 用遞迴生成一個start到end的Array
        var interval = function (start, end) {
            if (start > end) { return []; }
                return interval(start, end - 1).concat(end);
        };
        // 檢查一個組合是否有效
        var isValid = function (queenCol) {
            // 檢查兩個位置是否有衝突
            var isSafe = function (pointA, pointB) {
            var slope = (pointA.row - pointB.row) / (pointA.col - pointB.col);
            if ((0 === slope) || (1 === slope) || (-1 === slope)) { return false; }
                return true;
            };
            var len = queenCol.length;
            var pointToCompare = {
            row: queenCol[len - 1],
            col: len
            };
            // 先slice出除了最後一列的陣列，然後依次測試每列的點和待測點是否有衝突，最後合併測試結果
                return queenCol.slice(0, len - 1).map(function (row, index) {
                    return isSafe({row: row, col: index+1}, pointToCompare);
                }).reduce(function (a, b) {
                    return a && b;
                });
        };
        // 遞迴地去一列一列生成符合規則的組合
        var queenCols = function (size) {
            if (1 === size) {
                return interval(1, boarderSize).map(function (i) { return [i]; });
            }
                    // 先把之前所有符合規則的列組成的集合再擴充套件一列，然後用reduce降維，最後用isValid過濾掉不符合規則的組合
                    return queenCols(size - 1)
                    .map(function (queenCol) {
                    return interval(1, boarderSize).map(function (row) {
                    return queenCol.concat(row);
                });
            })
            .reduce(function (a, b) {
                return a.concat(b);
            }).filter(isValid);
        };


        // queens函式入口
        return queenCols(boarderSize);
    };



    // ******************************************************* //
    //                                                         //
    //             Keyboard action functions ! !               //
    //                                                         //
    // ******************************************************* //
    
    function onDocumentKeyDown(event) {
        var keyCode = event.which;
        // console.log('key : ', keyCode);
        if (keyCode == 90) {   
            // ******* z = 90 ********* //
            
            chessSize += 1
            let tempQueenAnsArray = queens(chessSize)
            init(chessSize,tempQueenAnsArray[0])
            showCase =0

        } else if (keyCode == 88) {     
            // ******* x = 88 ********* //
            chessSize -= 1
            let tempQueenAnsArray = queens(chessSize)
            init(chessSize,tempQueenAnsArray[0])
            showCase = 0

        } else if (keyCode == 67) {
            // ******* c = 67 ********* //
            let tempQueenAnsArray = queens(chessSize)
            // console.log('old',showCase)
            if (showCase-1 < 0){
                showCase=tempQueenAnsArray.length-1
            }else{
                showCase -= 1
            }
            // console.log('new',showCase)
            console.log(`new : ${showCase} , total solution : ${tempQueenAnsArray.length} , ans : ${tempQueenAnsArray[showCase]}` )

            
            init(chessSize,tempQueenAnsArray[showCase])

        } else if (keyCode == 86) {
            // ******* v = 86 ********* //
            let tempQueenAnsArray = queens(chessSize)
            if (showCase+2 > tempQueenAnsArray.length){
                showCase=0
            }else{
                showCase += 1
            }
            // console.log('new',showCase )
            console.log(`new : ${showCase} , total solution : ${tempQueenAnsArray.length} , ans : ${tempQueenAnsArray[showCase]}` )
            // showCase += 1
            init(chessSize,tempQueenAnsArray[showCase])
        } 
    };

 

    // ******************************************************* //
    //                                                         //
    //                button back function                     //
    //                                                         //
    // ******************************************************* //

    $("#main3-btn1").click(function(){
        chessSize += 1
        let tempQueenAnsArray = queens(chessSize)
        init(chessSize,tempQueenAnsArray[0])
        showCase =0
        txtUpdate(chessSize, tempQueenAnsArray.length, showCase+1, tempQueenAnsArray[showCase])
    }); 
    $("#main3-btn2").click(function(){
        chessSize -= 1
        let tempQueenAnsArray = queens(chessSize)
        init(chessSize,tempQueenAnsArray[0])
        showCase = 0
        txtUpdate(chessSize, tempQueenAnsArray.length, showCase+1, tempQueenAnsArray[showCase])


    }); 
    $("#main3-btn3").click(function(){
        // ******* c = 67 ********* //
        let tempQueenAnsArray = queens(chessSize)
        if (showCase-1 < 0){
            showCase=tempQueenAnsArray.length-1
        }else{
            showCase -= 1
        }
        console.log(`new : ${showCase} , total solution : ${tempQueenAnsArray.length} , ans : ${tempQueenAnsArray[showCase]}` )
        init(chessSize,tempQueenAnsArray[showCase])
        txtUpdate(chessSize, tempQueenAnsArray.length, showCase+1, tempQueenAnsArray[showCase])

    }); 
    $("#main3-btn4").click(function(){
        let tempQueenAnsArray = queens(chessSize)
        if (showCase+2 > tempQueenAnsArray.length){
            showCase=0
        }else{
            showCase += 1
        }
        console.log(`new : ${showCase} , total solution : ${tempQueenAnsArray.length} , ans : ${tempQueenAnsArray[showCase]}` )
        init(chessSize,tempQueenAnsArray[showCase])
        txtUpdate(chessSize, tempQueenAnsArray.length, showCase+1, tempQueenAnsArray[showCase])

    }); 

    function txtUpdate(size, totalAns, unmber, ans){
        const text1 = 'This eight queens puzzle is made with webgl, html, javascript '
        const text2 = `Chess board size : ${size} x ${size} `
        const text3 = `The ans has : ${totalAns} `
        const text4 = `This ans is the ( ${unmber} )'s ans , [${ans}] `
        $("#title").html(text1 + '<br>'+ '<br>' + text2 + '<br>' + text3+ '<br>' + text4);
    }


    // ******************************************************* //
    //                                                         //
    //                TweenMax Sample code                     //
    //                                                         //
    // ******************************************************* //

    // TweenMax.to(skytexture, 3, { opacity: 0.1 });
    // let objectBox = scene.getObjectByName( "boxbg" );
    // setTimeout(function() {
    //     objectBox.material.map = bgTexture2;
    //     TweenMax.to(skytexture, 4, { opacity: 1 });
    // }, 2800);