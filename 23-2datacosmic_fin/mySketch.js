// Data Cosmic Symphony by 2021152010 오윤서

//refer:Bubble Chamber - Jared Tarbell, 2003
//http://www.complexification.net/gallery/machines/bubblechamber/
//refer: RE:BubbleChamber_22 - SamuelYAN, 2022
// https://www.instagram.com/samuel_yan_1990/

//변수 선언
var p = [];
var q = [];
var mySize, margin;
var seed = Math.random() * 941;
let colors1 = "fef9fb-fafdff-fcfbf4-f9f8f6".split("-").map((a) => "#" + a);
let colors2;
let colors_tone1 = "0D1E40-224573-5679A6-F2A25C-D96B43".split("-").map((a) => "#" + a);
let colors_tone2 = "7E56A6-F28B50-A63B14-591202-260101".split("-").map((a) => "#" + a);
let colors_tone3 = "4ED98A-3B8C57-F2AD85-404040-0D0D0D".split("-").map((a) => "#" + a);
let colors_tone4 = "725373-7866F2-8979F2-025373-BF7D56".split("-").map((a) => "#" + a);
let colors_tone5 = "20BF1B-218C11-17590C-11400A-0D0D0D".split("-").map((a) => "#" + a);
let colors_tone6 = "F20519-A60522-031059-071773-044BD9".split("-").map((a) => "#" + a);
let colors_tone7 = "F2E96D-F2B84B-BF8034-402B12-0D0D0D".split("-").map((a) => "#" + a);
let colors_tone8 = "9E9BF2-F2E088-F29544-F24405-F27E63".split("-").map((a) => "#" + a); // candy memory
let colors_tone9 = "323140-7B7DA6-BABCD9-BF8339-BFA18F".split("-").map((a) => "#" + a);

let colors_root = "362300-805300-402900-734E39".split("-").map((a) => "#" + a);

let colorset = [];
let colorbg = "202020-1a1a1a-282828".split("-").map((a) => "#" + a); // dark
let filter1;
let plusO, plus1;
let t, par_num;
let originalGraphics;
let lineGraphics;
let HighSpeedParticle_Graphics;
let ver;
var theta, STEP;

//그래픽 생성을 위한 설정
function setup() {
	frameRate(50);
	randomSeed(int(seed));
	mySize = min(1400,550);
	margin = mySize / 100;
	createCanvas(1400,550);
	originalGraphics = createGraphics(1400,550);
	lineGraphics = createGraphics(1400,550);
	HighSpeedParticle_Graphics = createGraphics(1400,550);

//좌표 배열 초기화
	for (let j = 0; j < 1; j++) {
		for (let i = 0; i < 24; i++) {
			p[i] = createVector(width / 2, height / 2);
		}
	}
	for (let j = 0; j < 1; j++) {
		for (let i = 0; i < 10; i++) {
			q[i] = createVector(width / 2, height / 2);
		}
	}
	// pixelDensity(3);
	colors2 = random([colors_tone1, colors_tone2, colors_tone3, colors_tone4, colors_tone5, colors_tone6, colors_tone7, colors_tone8, colors_tone9]);
	// colors2 = colors_tone9;
	colorset[0] = random(colors2);
	colorset[1] = random(colors2);
	colorset[2] = random(colors1);
	colorset[3] = random(colors2);
	colorset[4] = random(colors2);
	colorset[5] = random(colors2);
	// ver = random([1, 2]);
	ver = 2;
	if (ver == 1) {
		background("#fafdff");
	}
	if (ver == 2) {
		background("#202020");
	}
	filter1 = new makeFilter();
	plusO = plus1 = t = 0;
	theta = 0;
	STEP = 0.3 * PI * 2.25; //곡선의 정밀도

}
//그래픽 업데이트 및 그리기
function draw() {
	randomSeed(seed);
	noiseSeed(int(seed));
	let ver = int(random(6, 8));
	strokeCap(PROJECT);

	//line 
	//'par_numm' 개수만큼 선을 그립니다
	//선의 색, 두께, 그림자 등이 램덤으로 설정되어 다양한 패턴을 생성합니다.
	par_num = random(1400, 550);
	for (let i = 0; i <= par_num; i++) {
		lineGraphics.fill(str(random(colorset)) + "0d");
		lineGraphics.noStroke();
		if (frameCount % 1 == 0) {
			lineGraphics.stroke(str(random(colorset)) + "0d");
			lineGraphics.strokeWeight(random(0.0008, 0.0003));
			lineGraphics.noFill();
		}
		lineGraphics.drawingContext.shadowColor = str(random(colorbg)) + "1a";
		lineGraphics.drawingContext.shadowOffsetX = 0.001;
		lineGraphics.drawingContext.shadowOffsetY = 0.001;
		lineGraphics.drawingContext.shadowBlur = 0.001;

		const xAngle = map(0, 0, width, -random(0.05, 0.05) * PI, random(0.05, 0.05) * PI, true);
		const yAngle = map(height, 0, height, -random(0.05, 0.05) * PI, random(0.05, 0.05) * PI, true);
		const angle = xAngle * width + yAngle * height;

		const myX = width / 2 + mySize / 2 * sin(random(0.005, 0.15) * TAU * t + angle);
		const myY = height / 2 + mySize / 2 * cos(random(0.5, 0.15) * TAU * t + angle);

		lineGraphics.push();
		lineGraphics.translate(myX + sin(random(0.005, 0.015) * TAU * t + angle), myY + cos(random(0.005, 0.015) * TAU * t + angle));
		lineGraphics.rotate(sin(t) * PI / 10);
		lineGraphics.ellipse(0, 0, random(0.5, 0.75) * (1 - sqrt(random(random(1)))) + plus1 / 5);
		lineGraphics.pop();
	}

	image(lineGraphics, 0, 0);
	t += random(0.5, 0.1);

	//originalGraphics
	//특정 시간 간격(100프레임마다)으로 새로운 시드를 설정합니다.
	//p'배열의 각 점('newp')에 대해 특정 패턴을 그리기 위한 반복문이 시작됩니다.
	//b1 변수는 노이즈를 이용하여 결정되는데, 현재 주석 처리되어 있습니다. 이 부분을 주석 해제하면 다른 결과를 얻을 수 있습니다.
	//이후 originalGraphics에 다양한 도형과 선이 그려지며, 그 중 일부는 그림자와 특별한 색상 효과도 포함되어 있습니다.
	if (frameCount % 100 == 0) {
		randomSeed(seed * random(frameCount / 10));
	}
	for (let newp of p) { // noprotect
		//let version = random(1, 10) * ver;
		let b1 = 1;
		// let b1 = noise(newp.x / version, newp.y / version) * TWO_PI * 1;
		let c = random(10, 1);

		// *** main point *** //
		b2 = (TWO_PI / c) * int((b1 / TWO_PI) * c) + c;
		//newp.add(0 * sin(b2), 0 * cos(b2));
		originalGraphics.push();
		originalGraphics.translate(newp.x, newp.y);
		//originalGraphics.rotate(random(TAU));
		let gard_w = random(mySize / 0.35, mySize / 0.75) / ver;
		let gard_h = random(mySize / 0.35, mySize / 0.75) / ver;

		for (let k = 0; k < 1; k++) {
			originalGraphics.push();
			originalGraphics.translate(random(1.75, 0.45) * random(-gard_w, gard_w) * (1 - sqrt(random(random(random())))),
				random(1.75, 0.45) * random(-gard_h, gard_h) * (1 - sqrt(random(random(random())))));
			originalGraphics.blendMode(BLEND);
			originalGraphics.push();
			let r_max = random(0.75, 1.25) * random(gard_w, gard_h) / random(64, 4);
			for (let k = 0; k < 250; k++) {
				originalGraphics.noFill();
				random(seed * k);
				originalGraphics.stroke(str(random(colorset)) + "05");
				let r = (1 / sqrt(random(random(random())))) * r_max + plus1 * random(10, 5);
				originalGraphics.strokeWeight(0.15 * (1 - sqrt(random(random(random())))));
				let angle = random(TWO_PI);
				let point_x = cos(angle) * r;
				let point_y = sin(angle) * r;
				originalGraphics.point(point_x, point_y);

			}
			originalGraphics.pop();

			for (let k = 0; k < 4; k++) {
				originalGraphics.rotate(random(TAU));

				originalGraphics.fill(0,80);//불투명도를 50으로 설정
				originalGraphics.noStroke();
				let speed_ratio1 = random(10, 5);
				let speed_ratio2 = random(10, 5);
				let grad = drawingContext.createRadialGradient(r_max / 2 - plus1 * speed_ratio1, r_max / 2 - plus1 * speed_ratio1, 0, r_max / 2 - plus1 * speed_ratio2, r_max / 2 - plus1 * speed_ratio2, r_max * random(1.5, 2.25) + plus1 * speed_ratio2);
				grad.addColorStop(random(0.15, 0.25), str(random(colorset)) + "00");
				grad.addColorStop(random(0.25, 0.45), str(random(colorset)) + "05");
				grad.addColorStop(random(0.45, 0.55), str(random(colorset)) + "00");
				originalGraphics.drawingContext.fillStyle = grad;

				originalGraphics.drawingContext.setLineDash([1, 2, 2, 3]);
				originalGraphics.circle(0, 0, r_max * 2);
			}

			if (seed % 1 == 0) {
				for (let k = 0; k < 12; k++) {
					originalGraphics.rotate(random(TAU));

					originalGraphics.fill(0,20);
					originalGraphics.noStroke();
					let speed_ratio1 = random(10, 5);
					let speed_ratio2 = random(10, 20);
					let grad = drawingContext.createRadialGradient(r_max / 2 - plus1 * speed_ratio1, r_max / 2 - plus1 * speed_ratio1, 0, r_max / 2 - plus1 * speed_ratio2, r_max / 2 - plus1 * speed_ratio2, r_max * random(1.5, 2.25) + plus1 * speed_ratio2);
					grad.addColorStop(random(0.29, 0.28), str(random(colorset)) + "00");
					grad.addColorStop(random(0.3, 0.29), random(colorset));
					grad.addColorStop(random(0.3, 0.31), str(random(colorset)) + "00");
					originalGraphics.drawingContext.fillStyle = grad;

					originalGraphics.drawingContext.shadowColor = str(random(colors1)) + "40";
					originalGraphics.drawingContext.shadowOffsetX = 1;
					originalGraphics.drawingContext.shadowOffsetY = 1;
					originalGraphics.drawingContext.shadowBlur = 0;

					originalGraphics.drawingContext.setLineDash([1, 2, 2, 3]);
					originalGraphics.circle(0, 0, r_max * 2);
				}
			}

			originalGraphics.stroke(str(random(colorset)) + "05");
			originalGraphics.strokeWeight(random(0.001, 0.005) * (1 - sqrt(random(random(random(random()))))));
			originalGraphics.noFill();
			originalGraphics.circle(0, 0, r_max * 20);
			originalGraphics.pop();
		}

		for (let k = 0; k < 1; k++) {
			originalGraphics.push();
			originalGraphics.translate(random(5, 0.25) * random(-gard_w, gard_w) * (1 - sqrt(random(random(random())))),
				random(1.75, 0.25) * random(-gard_h, gard_h) * (1 - sqrt(random(random(random())))));
			originalGraphics.blendMode(BLEND);
			originalGraphics.push();
			let r_max = random(0.3, 4) * random(gard_w, gard_h) / random(80, 4);
			for (let k = 0; k < 100; k++) {
				originalGraphics.noFill();
				random(seed * k);
				originalGraphics.stroke(str(random(colorset)) + "1a");
				let r = (1 / sqrt(random())) * r_max;
				originalGraphics.strokeWeight(0.3 * (1 - sqrt(random(random(random())))));
				let angle = random(TWO_PI);
				let point_x = cos(angle) * r;
				let point_y = sin(angle) * r;
				originalGraphics.point(point_x, point_y);

			}
			originalGraphics.pop();

			for (let k = 0; k <5; k++) {
				originalGraphics.rotate(random(TAU));

				originalGraphics.fill(0,40);
				originalGraphics.noStroke();
				let speed_ratio1 = random(10, 5);
				let speed_ratio2 = random(10, 20);
				let grad = drawingContext.createRadialGradient(r_max / 2 - plus1 * speed_ratio1, r_max / 2 - plus1 * speed_ratio1, 0, r_max / 2 - plus1 * speed_ratio2, r_max / 2 - plus1 * speed_ratio2, r_max * random(1.5, 2.25) + plus1 * speed_ratio2);
				grad.addColorStop(random(0.25, 0.35), str(random(colorset)) + "00");
				grad.addColorStop(random(0.35, 0.45), str(random(colorset)) + "05");
				grad.addColorStop(random(0.45, 0.55), str(random(colorset)) + "00");
				originalGraphics.drawingContext.fillStyle = grad;

				originalGraphics.drawingContext.shadowColor = str(random(colors1)) + "40";
				originalGraphics.drawingContext.shadowOffsetX = 1;
				originalGraphics.drawingContext.shadowOffsetY = 1;
				originalGraphics.drawingContext.shadowBlur = 0;

				originalGraphics.drawingContext.setLineDash([1, 2, 2, 3]);
				originalGraphics.circle(0, 0, r_max * 2);
			}

			originalGraphics.stroke(str(random(colorset)) + "05");
			originalGraphics.strokeWeight(random(0.1, 0.4) * (1 - sqrt(random(random(random(random()))))));
			originalGraphics.noFill();
			originalGraphics.circle(0, 0, r_max * 2);
			originalGraphics.pop();
		}
		originalGraphics.pop();
	}

	//HighSpeedParticle_Graphics
	//처음 400프레임 동안 q 배열의 좌표들을 이용하여 고속 입자 그래픽을 그립니다.
	// 선의 색, 두께, 그림자 등이 랜덤으로 설정되어 다양한 패턴을 생성합니다.
	if (frameCount < 400) {
		randomSeed(seed);
		for (let newq of q) {
			let version = random(1, 0) * ver;
			let b1 = noise(newq.x / version, newq.y / version) * TWO_PI * 1;
			let c = random(1000, 500);

			// *** main point *** //
			//선 속성 결정
			b2 = (TWO_PI / c) * int((b1 / TWO_PI) * c) + c;
			newq.add(random(0.01, 0.005) * sin(b2), random(0.005, 0.01) * cos(b2));
			HighSpeedParticle_Graphics.push();
			HighSpeedParticle_Graphics.translate(newq.x, newq.y);
			HighSpeedParticle_Graphics.rotate(random(TAU));
			let gard_w = random(mySize / 0.01, mySize / 0.03) / ver; //선 두께
			let gard_h = random(mySize / 0.05, mySize / 0.45) / ver; //선 길이
			HighSpeedParticle_Graphics.stroke(random(colorset)); //선 색상
			HighSpeedParticle_Graphics.strokeWeight(0.8- sqrt(random(random(random())))); //선 두께
			HighSpeedParticle_Graphics.noFill();

			//그림자효과와 선 스타일
			//shadowColor: 랜덤하게 선택된 colors1 배열의 색상에 투명도 "80"을 더하여 선의 그림자 색상을 설정합니다.
			//shadowOffsetX 및 shadowOffsetY: 선의 그림자의 X 및 Y 방향으로의 오프셋을 설정합니다. 현재는 음수 값으로 설정되어 있어서 왼쪽 상단 방향으로 그림자가 표시됩니다.
			//shadowBlur: 그림자의 흐림 효과를 나타냅니다. 현재는 0으로 설정되어 있어 흐리지 않습니다.

			HighSpeedParticle_Graphics.drawingContext.shadowColor = str(random(colors1)) + "20";
			HighSpeedParticle_Graphics.drawingContext.shadowOffsetX = -1;
			HighSpeedParticle_Graphics.drawingContext.shadowOffsetY = -1;
			HighSpeedParticle_Graphics.drawingContext.shadowBlur = 0;

			//shadowColor: 랜덤하게 선택된 colorbg 배열의 색상에 투명도 "40"을 더하여 선의 그림자 색상을 설정합니다.
			//shadowOffsetX 및 shadowOffsetY: 선의 그림자의 X 및 Y 방향으로의 오프셋을 설정합니다. 현재는 양수 값으로 설정되어 있어서 오른쪽 하단 방향으로 그림자가 표시됩니다.
			//shadowBlur: 그림자의 흐림 효과를 나타냅니다. 현재는 0으로 설정되어 있어 흐리지 않습니다.
			//setLineDash: 선의 대시 패턴을 설정합니다. 현재는 [4, 8, 2, 5]로 설정되어 있어 점선 패턴이 생성됩니다.

			HighSpeedParticle_Graphics.drawingContext.shadowColor = str(random(colorbg)) + "40";
			HighSpeedParticle_Graphics.drawingContext.shadowOffsetX = 1;
			HighSpeedParticle_Graphics.drawingContext.shadowOffsetY = 1;
			HighSpeedParticle_Graphics.drawingContext.shadowBlur = 0;
			HighSpeedParticle_Graphics.drawingContext.setLineDash([4, 8, 2, 5]);

			//원형 라인

			for (let k = 0; k < 1; k++) {
				HighSpeedParticle_Graphics.push();
				HighSpeedParticle_Graphics.translate(random(1.25, 0.5) * random(-gard_w, gard_w), random(1.25, 0.5) * random(-gard_h, gard_h));
				let r = (1 - sqrt(random(random(random())))) * (random(1, 2) * random(width, height) / random(128, 16));
				HighSpeedParticle_Graphics.stroke(str(random(colorset)) + "05");
				HighSpeedParticle_Graphics.strokeWeight(1 - sqrt(random(random(random()))) + theta / 100);
				HighSpeedParticle_Graphics.noFill();
				let rad1 = sqrt(theta);
				let rad2 = sqrt(theta + STEP);
				let line_x1 = r * rad1 * cos(theta);
				let line_y1 = r * rad1 * sin(theta);
				let line_x2 = r * rad2 * cos(theta + STEP);
				let line_y2 = r * rad2 * sin(theta + STEP);
				HighSpeedParticle_Graphics.line(line_x1, line_y1, line_x2, line_y2);
				HighSpeedParticle_Graphics.pop();
			}

			HighSpeedParticle_Graphics.drawingContext.setLineDash([2, 4, 2, 5]);
			for (let k = 0; k < 1; k++) {
				HighSpeedParticle_Graphics.push();
				HighSpeedParticle_Graphics.translate(random(10, 0.5) * random(-gard_w, gard_w), random(1.25, 0.5) * random(-gard_h, gard_h));
				let r = (1 - sqrt(random(random(random())))) * (random(1, 2) * random(width, height) / random(128, 64));
				HighSpeedParticle_Graphics.stroke(str(random(colorset)) + "80");
				HighSpeedParticle_Graphics.strokeWeight(1 - sqrt(random(random(random()))) + theta / 100);
				HighSpeedParticle_Graphics.noFill();
				let rad1 = sqrt(theta);
				let rad2 = sqrt(theta + STEP);
				let line_x1 = r / rad1 * cos(theta);
				let line_y1 = r / rad1 * sin(theta);
				let line_x2 = r / rad2 * cos(theta + STEP);
				let line_y2 = r / rad2 * sin(theta + STEP);
				HighSpeedParticle_Graphics.line(line_x1, line_y1, line_x2, line_y2);
				HighSpeedParticle_Graphics.pop();
			}

			HighSpeedParticle_Graphics.drawingContext.setLineDash([2, 4, 3, 5]);
			if (frameCount > 1) {
				for (let k = 0; k < 1; k++) {
					HighSpeedParticle_Graphics.drawingContext.shadowColor = str(random(colors1)) + "1a";
					HighSpeedParticle_Graphics.drawingContext.shadowOffsetX = random(-1, 1);
					HighSpeedParticle_Graphics.drawingContext.shadowOffsetY = random(-1, 1);
					HighSpeedParticle_Graphics.drawingContext.shadowBlur = 0;
					HighSpeedParticle_Graphics.push();
					HighSpeedParticle_Graphics.translate(random(1.75, 1) * random(-gard_w, gard_w), random(1.75, 1) * random(-gard_h, gard_h));
					HighSpeedParticle_Graphics.rotate(random(TAU));
					let r = (1 - sqrt(random(random(random())))) * (random(1, 2) * random(width, height) / random(128, 16));

					HighSpeedParticle_Graphics.stroke(str(random(colorset)) + "0d");
					HighSpeedParticle_Graphics.strokeWeight(0.8 - sqrt(random(random(random()))) + theta / 100);
					HighSpeedParticle_Graphics.noFill();
					let rad1 = sqrt(1 - theta);
					let rad2 = sqrt(1 - (theta + STEP));
					let line_x1 = r / rad1 * cos(theta);
					let line_y1 = r / rad1 * sin(theta);
					let line_x2 = r / rad2 * cos(theta + STEP);
					let line_y2 = r / rad2 * sin(theta + STEP);
					HighSpeedParticle_Graphics.line(line_x1, line_y1, line_x2, line_y2);
					HighSpeedParticle_Graphics.pop();
				}

				for (let k = 0; k < 1; k++) {
					HighSpeedParticle_Graphics.push();
					HighSpeedParticle_Graphics.translate(random(1.75, 1) * random(-gard_w, gard_w), random(1.75, 1) * random(-gard_h, gard_h));
					let r = (1 - sqrt(random(random(random())))) * (random(1, 2) * random(width, height) / random(128, 32));

					HighSpeedParticle_Graphics.stroke(str(random(colorset)) + "40");
					HighSpeedParticle_Graphics.strokeWeight(10 - sqrt(random(random(random()))) + theta / 100);
					HighSpeedParticle_Graphics.noFill();
					let angle = random(TWO_PI);
					let rad1 = pow(1, theta);
					let rad2 = pow(1, theta + STEP);
					let line_x1 = rad1 * cos(theta) * r;
					let line_y1 = rad1 * sin(theta) * r;
					let line_x2 = rad2 * cos(theta + STEP) * r;
					let line_y2 = rad2 * sin(theta + STEP) * r;
					HighSpeedParticle_Graphics.line(line_x1, line_y1, line_x2, line_y2);
					HighSpeedParticle_Graphics.pop();
				}

				for (let k = 0; k < 1; k++) {
					HighSpeedParticle_Graphics.drawingContext.shadowColor = str(random(colors1)) + "1a";
					HighSpeedParticle_Graphics.drawingContext.shadowOffsetX = random(-1, 1);
					HighSpeedParticle_Graphics.drawingContext.shadowOffsetY = random(-1, 1);
					HighSpeedParticle_Graphics.drawingContext.shadowBlur = 0;
					HighSpeedParticle_Graphics.push();
					HighSpeedParticle_Graphics.translate(random(1.75, 1) * random(-gard_w, gard_w), random(1.75, 1) * random(-gard_h, gard_h));
					HighSpeedParticle_Graphics.rotate(random(TAU));
					let r = (1 - sqrt(random(random(random())))) * (random(1, 2) * random(width, height) / random(2, 8));

					HighSpeedParticle_Graphics.stroke(str(random(colorset)) + "1a");
					HighSpeedParticle_Graphics.strokeWeight(1 - sqrt(random(random(random()))) + theta / 100);
					HighSpeedParticle_Graphics.noFill();
					let rad1 = theta;
					let rad2 = theta + STEP;
					let line_x1 = r / rad1 * cos(theta);
					let line_y1 = r / rad1 * sin(theta);
					let line_x2 = r / rad2 * cos(theta + STEP);
					let line_y2 = r / rad2 * sin(theta + STEP);
					HighSpeedParticle_Graphics.line(line_x1, line_y1, line_x2, line_y2);
					HighSpeedParticle_Graphics.pop();
				}
			}
			HighSpeedParticle_Graphics.pop();
			plusO -= random(0.2, 0.3) * random(3, 2) * random(0.001, 0.00075) / 2;
			plus1 += random(0.2, 0.1) * random(3, 2) * random(0.001, 0.0005) / 10;
		}
	}
	//이미지 블렌딩
	//originalGraphics, HighSpeedParticle_Graphics, overAllTexture 이미지들을 불러와서 캔버스에 블렌딩하여 출력합니다.
	theta += STEP * random(1, 1.5) * (1 - sqrt(random(random(random()))));
	blendMode(BLEND);
	image(originalGraphics, 0, 0);
	image(HighSpeedParticle_Graphics, 0, 0);
	image(overAllTexture, 0, 0);

	//최종 렌더링 및 특수 효과:
	//특정 조건에서 렌더링을 멈추고 추가적인 블렌딩과 도형을 그립니다.
	if (frameCount == 300) {
		noLoop();
		blendMode(BLEND);
		image(overAllTexture, 0, 0);
		blendMode(ADD);
		strokeWeight(random(0.01, 0.02) / 4);
		stroke(str(random(colorbg)) + "33");
		noFill();
		drawingContext.setLineDash([1, 5, 1, 3]);
		drawOverPattern();
		drawingContext.setLineDash([1, 1, 1, 1]);
		blendMode(BLEND);

		noFill();
		strokeWeight(margin);
		rectMode(CORNER);
		stroke("#202020");
		rect(0, 0, width, height);
	}
}