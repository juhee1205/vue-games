# 🎮 미니 게임
> vue3 + typescript를 학습하기 위해 진행한 토이 프로젝트 입니다😀<br>
> 일부 주제는 [이 블로그](https://velog.io/@teo/2021-%EC%9B%B9-%ED%94%84%EB%A1%A0%ED%8A%B8%EC%97%94%EB%93%9C-%EA%B3%B5%EB%B6%80%EB%B2%95-%EC%9E%85%EB%AC%B8%EC%9E%90%ED%8E%B8-%EC%BB%A4%EB%A6%AC%ED%81%98%EB%9F%BC)를 참고하였습니다.

## 프로젝트 주제
- [x] 빙고
- [x] 1 to 50
- [x] left right
- [x] 로또 번호 생성기
- [x] 카드 짝 맞추기
- [x] 가위바위보

# 빙고 🎱
### 요구사항
- 5*5 빙고판으로 숫자는 1~25로 구성
- 순서대로 나열된 번호 카드를 보여주고, 게임 시작 시 카드를 섞어준다.
- 한쪽에 번호 뽑기 버튼 만들고 번호를 랜덤으로 뽑을 수 있도록 한다.
- 빙고 줄이 완성 될 때 마다 축하하는 애니메이션을 넣어준다
# 1 to 50 📍
### 요구사항
- 1 ~ 50 까지 순서대로 나열된 번호 카드를 보여주고, 게임 시작 시 카드를 섞어준다.
- 게임은 90초 제한. 90초 이내 클리어하지 못할 경우 타임오버로 게임이 끝난다.
- Combo와 점수를 표기. 점수는 콤보 * 10 (ex:  3Combo 일 때 30점 추가)
- Combo는 0.5초 이내로 클릭시 적용 된다.
- 게임이 진행되는 동안 게임을 방해하기 위해 배경에 움직임 요소를 두어 게임을 방해😜한다

# left right ⬅➡
### 요구사항
- 좌/우 화살표 방향키가 세로로 내려온다
- 현재 눌러야 되는 화살표는 사이즈를 키워서 눈에 띄도록 처리
- 사용자가 입력한 키가 맞을 때 제일 아래에 있는 키는 자연스럽게 사라진다
- 사용자가 입력한 키가 틀렸을 때 틀렸다는 효과를 준다
- Combo와 점수를 표기. 점수는 콤보 * 10 (ex:  3Combo 일 때 30점 추가)

# 로또 번호 생성기 🎰
### 기본기능
- 1~45까지 숫자 중 6개의 중복되지 않은 번호 생성
  - 6개의 숫자는 모두 짝수이거나 홀수 일 수 없다.(홀수와 짝수가 섞여 있는 수)
  - 6개 숫자는 연속되는 숫자일 수 없다. ([1,2,3,4,5,6], [10,11,12,13,14,15,16])
  - 6개 숫자는 연속 행렬 조합으로 이루어 질 수 없다 ([5,10,15,20,25,30], [3,6,9,12,15,16])
  - 제일 작은 수가 30 이하, 제일 큰 수가 15 이상
  - 같은 번호 대의 숫자가 3개 이상일 수 없다 ([1,2,3,20,31,34]: X , [10,11,23,25,27,40] : X)
- 1~5 세트까지 원하는 세트만큼 번호 생성
- 생성된 번호는 오름차순으로 정렬
- 번호는 1~45까지 빠른 속도로 변경 되다 하나씩 보여준다

# 카드 짝 맞추기 🃏
### 요구사항
- 2쌍이 같은 랜덤한 카드 N장의 뒷면을 보여준다.
- 1장을 선택하면 해당 카드의 앞면을 보여준다.
- 나머지 다른 1장을 선택했을 때 같다면 보여주고 아니라면 다시 둘 다 뒤집어 둔다.
- 다 맞으면 성공
- 모든 카드를 맞췄을 때 재 시작 팝업을 보여준다

# 가위바위보 ✌️✊🖐
### 요구사항
- computer :  가위바위보(✌️✊🖐) 순서대로 빠르게 변함
- 사용자: 가위바위보(✌️✊🖐)를 선택할 수 있음
- 사용자가 가위바위보(✌️✊🖐)를 선택할 때 Gamer 화면을 멈추고 승, 패, 무 를 표기한다.
- 승패와 상관없이 게임을 계속 진행하도록