# onCondition-client

사람의 컨디션을 좌우하는 수면, 식사, 그리고 운동 - 세 가지 영역을 포함한 총 여섯가지 영역의 기록을 통해 나의 컨디션을 그래프로 확인해보세요!

## 주요기능

- **Google fit API**를 통해 사용자의 운동 정보와 수면 정보, 그리고 걸음 수를 받아옵니다.
- 앨범형과 그리드형, **두 가지 선택형 카테고리**를 최대 세 개까지 추가할 수 있습니다.
- 각 카테고리에서 **사진(앨범형, 그리드형)과 만족도, 그리고 간단한 일기**를 기록할 수 있습니다.
- 최소 세 개, 최대 여섯 개의 **각 카테고리별 평균 만족도를 그래프로 확인할 수 있습니다.**
  - 30일간의 카테고리별 평균 만족도 변화를 일자별 방사형 그래프로 보여줍니다.
  - 7일간의 카테고리별 평균 만족도 변화를 일자별 선형 그래프로 보여줍니다.
  - 7일간의 일자별 총 수면시간을 막대형 그래프로 보여줍니다.
- **친구의 활동에 댓글**을 남길 수 있습니다.
- **친구의 최근 1일치 평균 만족도를 방사형 그래프로 확인**할 수 있습니다.

## Tech Stack

  ### Frontend
    - ES2015+
    - React
    - Redux
    - Toolkit
    - Amazon s3
    - Google Fit API
    - Chart.js

  ### Backend
    - MongoDB
    - Mongoose
    - Express
    - Node.js

  ### Test
    - Jest

  ### Tools
    - Style components
    - esLint
    - Husky
    - Amazon Elastic Beanstalk
    - Amazon Code Pipeline
    - Google Firebase
    - Netlify

## 도전한 점 / 극복한 점 / 새로웠던 점
---
  ### 로그인(firebase) 토큰 의존성
    - Google Fit API를 사용하기 때문에 구글에서 제공하는 로그인 방법을 사용한다면, 로그인 직후에 생성되는 토큰으로 Google Fit API 에 정보 업데이트를 별도의 인증과정 없이 한 번에 요청할 수 있을 것으로 기대했습니다. 구글  Fit API에서는 firebase에서 돌려주는 토큰과는 별도로 google oAuth에서 제공하는 특정 스코프 또한 요구했기 때문에 프로젝트 초기에는 firebase와 oAuth 둘 다 사용하여 로그인을 이중으로 처리해야했습니다. 이후 firebase에서 스코프를 추가해서 리턴받을 수 있는 addScope 기능을 발견하여 firebase로 로그인 과정을 하나로 통합할 수 있었습니다. 그러나 firebase에서는 refresh 토큰을 별도로 제공하지 않고 1시간만에 토큰이 만료되는 상황이며, 현재 이 부분에 대한 처리가 진행중입니다.

    - firebase에서 로그인 이벤트 처리 후 돌려주는 토큰들의 값과 타이밍이 정해져있었기 때문에 로그인 이벤트와 Google Fit API 호출 타이밍 간의 상호 의존도가 높아졌습니다. 수동 동기화 기능의 구현을 위해 사용자가 로그인을 이미 끝마친 상황에서 Google Fit API를 새로 호출할 수 있도록 로그인 이벤트와 API 호출 이벤트간의 분리가 필요했습니다. 따라서 firebase 로그인 성공 후 리다이렉트되는 최초 페이지에서 Google Fit API를 호출하는 방식으로 두 이벤트 간의 연속성을 유지하면서도 동기화 기능을 분리, 수동동기화 부분에서 재사용할 수 있었습니다.

  ### 접근권한(accessLevel)의 구분
    - 소셜 기능을 추가한 후, 사용자 본인이 작성하지 않은 게시글 혹은 댓글에 대한 접근 권한을 설정해야했습니다. 접근 권한의 확인을 위해 최초 로그인 이후 랜딩 페이지를 포함한 모든 페이지 이동시 사용자 코드와 접근하고자하는 게시글의 oId, 두 가지 정보로 접근권한을 먼저 판별하는 미들웨어를 작업했습니다. 그러나 접근권한의 판별을 위해 모든 페이지 / 라우터가 사용자의 정보를 가져오는 depth와 방법이 동일해야했기 때문에 회의를 거쳐 모든 라우터를 `/:userId/:category/:게시글oId` 형식으로 통일했습니다. 이 후 하나의 미들웨어에서 로컬스토리지에 저장된 토큰과 주소에 파라미터로 잡히는 유저 코드를 비교, 본인 확인을 하며 동시에 해당 게시글에 대한 접근권한을 판단할 수 있었습니다. 또한, 라우터의 depth 통일로 각 카테고리별로 저장된 게시글의 상세정보를 보여주는 detail 페이지를 하나의 리액트 페이지 안에서 분기처리할 수 있게 되었습니다.

  ### 컴포넌트 중복 많음
    - 초반 목업 구상 후 작업 분배시 몇몇 컴포넌트가 중복되니 초반에 컴포넌트를 많이 만들어놓으면 후반에 일정이 촉박하지 않을 것이라고 기대했습니다. 그러나 각자 작업하는 부분과 컴포넌트에 요구하는 기본 기능이 제각각이었기 때문에 각자 버튼을 하나씩 만드는 중복작업의 시기가 존재했습니다. 따라서 프로젝트 시작 3일만에 회의를 통하여 기존 목업에서 중복되는 컴포넌트와 해당 페이지에서만 요구, 사용되는 유니크한 컴포넌트 2종으로 컴포넌트를 분류했습니다. 이후, 각자의 작업범위 내에서 (서로 필요한것 상호참조)

  ### 배포 후 쿠키 사용 이슈
    - 배포 전 로컬 개발 환경에서는 쿠키에 토큰을 보관하고 있었는데, 서버와 클라이언트 배포시 서로 같은 도메인을 사용해도 다른 도메인으로 인식하여 쿠키 사용이 불가능함을 확인했습니다. 이로 인해 토큰 저장 장소를 쿠키에서 로컬 스토리지로 바꾸고, 로그아웃시 로컬 스토리지를 모두 지워주는 것으로 로직을 전면 수정했습니다.

## 시도하고 싶었던 것 / 아쉬웠던 것
---
  ### 웹뷰
    - 프로젝트의 볼륨이 커지면서 가용 시간이 줄어들었고, 웹뷰 버전을 진행하지 못했습니다. 모든 팀원들에게 첫 시도였던 반응형 적용은 성공하였으나, CRUD에 충실한 본 프로젝트의 성격상 한 번도 시도해보지 않은 새로운 기술에 대한 도전이 아쉽습니다. 프로젝트 발표 후 웹뷰 적용을 시도할 예정입니다.

  ### 그래프와 자료 처리 (수면 그래프, 추세선)
    - 그래프 처리를 위해 chart.js를 도입 및 적용했습니다. 10여개의 DB에서 원하는 자료를 시간, 게시자, 모델 범위, 순서 등 모든 것을 고려하여 chart.js가 소화할 수 있는 모양의 데이터로 가공해서 넘겨주는데에 생각보다 많은 시간이 걸렸습니다. 그러나 기존 단순한 모델 쿼리문(Model.find())이 아닌, aggregate 기능을 이용해 데이터 검색 범위 및 적용 조건을 상세히 설정하는 법을  익힐 수 있어서 뜻 깊은 시간이었습니다.
    - 목업 설계시에는 수면 그래프가 이렇게 까다로운 것이라고 생각하지 못했습니다. Chart.js 에서는  y-axis 를 시간 단위로 그리는 기능을 제공하지 않았습니다. 수면 패턴에 대한 예측 불가능성 또한 예측하지 못한 변수였습니다. 낮잠시간을 고려한다면 하나의 label에 여러 데이터가 각각 떠있어야하며, 전날 밤에 잠들어 그 다음 날 일어나기 때문에 하나의 연속된 데이터를 각기 다른 label에 잘라서 띄워주어야했습니다. 결국 시간관계상 하루 총 수면 시간으로 그래프 데이터를 교체했으나 D3 등 다른 그래프 라이브러리를 이용했다면 구현이 가능하지 않았을까 아쉬움이 남습니다.

  ### 앨범형 카테고리에서 스크롤 애니메이션 추가
    - 앨범형 카테고리는 드래그를 하면 등록되어있는 사진들이 움직이며 리스트를 확인할 수 있도록 설계되어있습니다. 사용자가 드래그 이벤트를 발생시켰을 경우, 이벤트가 발생한 곳의 y값 변화를 기준으로 잡아 기존 사진들의 변경 위치를 계산해주는 방식으로 라이브러리를 사용하지 않고 스크롤 기능이 가능하도록 구현하였습니다. 그러나 움직이는 요소들의 특성상 모든 요소들의 마진이 동적으로 변경되기 때문에 애니메이션을 넣어 움직임을 보다 효과적으로 보여주는 UX에 대한 아쉬움이 남습니다. (어떻게 하면 가능할까?)

  ### 만족도 인풋 방식 슬라이드형에서 터치형으로 변경
    - 사용자는 onCondition에 기록할 수 있는 거의 모든 종류의 데이터에 만족도를 기록할 수 있습니다. 이 만족도는 "하트 슬라이드"라고 불리우는 다섯개의 하트모양 input 을 통해 1 ~ 10점까지 입력이 가능한데, 하트를 직접 클릭해서 입력할 수 있게 설계했던 초기 목업과는 달리 하단에 위치한 슬라이드바를 통해 입력하게 구현 되어있습니다. UX 상으로 유저가 손가락으로 하트를 직접 클릭하게 되면 하트가 가려지니 슬라이드바로 구현한 것이 입력에는 더 편리할 수 있으나 좀 더 직관적인 방법은 하트를 직접 클릭하는 터치형이라고 생각되어 input과 label 태그를 이용하여 추후 구현해보고 싶습니다.
