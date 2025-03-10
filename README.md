# chat-soket

# 설치 및 실행
- npm init -y
- npm install express socket.io cors
- node server.js

## Dependencies: 프로덕션 코드에서 사용되는 패키지들입니다.
- cors 2.8.5
	- **Cross-Origin Resource Sharing(CORS)**를 활성화하는 미들웨어로, 다른 도메인 간의 HTTP 요청을 허용할 수 있도록 설정합니다.
	- Express 서버에서 프론트엔드와 백엔드가 다른 도메인에 있을 때 CORS 정책을 우회하는 데 사용됩니다.
- express 4.21.2
	- Node.js 기반 웹 프레임워크로, HTTP 서버를 쉽게 구축할 수 있도록 도와줍니다.
	- API 서버, 미들웨어 적용, 라우팅 관리 등 다양한 기능을 제공합니다.
	- Socket.io와 함께 사용하여 실시간 서버 구축에도 활용됩니다.
- socket.io 4.8.1
	- 실시간 양방향 통신을 지원하는 라이브러리로, WebSocket을 기본으로 하며 폴백 메커니즘도 제공합니다.
	- 서버 측에서 이벤트 기반 통신을 관리하며, socket.io-client와 연결되어 채팅, 알림 시스템, 실시간 데이터 전송 등에 사용됩니다.