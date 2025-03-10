const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
	cors: {
		origin: "http://localhost:5173", // 프론트엔드에서 접근 가능하도록 설정
		methods: ["GET", "POST"],
	},
});

let resData = [];

io.on("connection", (socket) => {
	// console.log("사용자 접속:", socket.id);

	// 채팅방 입장
	socket.on("joinRoom", ({ roomNo, getUserInfo }) => {
		socket.join(roomNo);
		resData[socket.id] = { roomNo, getUserInfo };
		console.log(`입장 ---- ${getUserInfo.user_name}님이 ${roomNo}방에 입장했습니다.`);
		io.to(roomNo).emit("getJoinRoom", getUserInfo.user_name); // 같은 방 사용자들에게 메시지 전달
	});

	// 메시지 전송
	socket.on("sendMessage", async (reqData, callback) => {
		try {
			// 예제: 메시지를 데이터베이스에 저장하는 로직 (실제로는 DB 처리 필요)
			if (!reqData.content) throw new Error("메시지 내용이 없습니다.");

			const now = new Date();
			const year = now.getFullYear();
			const month = String(now.getMonth() + 1).padStart(2, '0'); // 월(0부터 시작) 보정
			const day = String(now.getDate()).padStart(2, '0');
			const hours = String(now.getHours()).padStart(2, '0');
			const minutes = String(now.getMinutes()).padStart(2, '0');
			const seconds = String(now.getSeconds()).padStart(2, '0');
			const date = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
			reqData.date = date;
			// 같은 방 사용자들에게 메시지 전달
			io.to(reqData.roomNo).emit("getSendMessage", reqData);

			// 클라이언트에게 성공 응답
			callback({ success: true, data: reqData });
		} catch (error) {
			// 클라이언트에게 실패 응답
			callback({ success: false, error: error.message });
		}
	});

	// 사용자 연결 해제
	socket.on("disconnect", () => {
		const userData = resData[socket.id]; // 데이터를 변수에 저장
	
		if (userData) {
			console.log(`퇴장 ---- ${userData.getUserInfo.user_name}님이 ${userData.roomNo}방에 퇴장하셨습니다.`);
	
			// 연결이 끊어진 사용자에게 방에 있는 다른 사용자들에게 메시지를 전달
			io.to(userData.roomNo).emit("getDisconnected", userData.getUserInfo.user_name);
			
			// 해당 사용자의 데이터를 삭제하여 메모리 관리
			delete resData[socket.id];
		} else {
			console.log("사용자 데이터가 존재하지 않습니다.");
		}
	});
});

server.listen(4000, () => {
	console.log("소켓 서버 실행 중... 포트: 4000");
});
