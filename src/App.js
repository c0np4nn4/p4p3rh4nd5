/* eslint no-restricted-globals: ["off"] */
import React, { useEffect, useState } from 'react';
// import { ethers } from 'ethers';
import './App.css';

import PaperHand from './asset/images/Paper-Hand.svg';
import DiamondHand from './asset/images/Diamond-Hand.svg';

let 너굴맨의분노게이지 = 0;

const api = require('etherscan-api').init('53DUFYG3IHV1PIHPUA246M2YSSUKF79ER3');

const App = () => {
  const [address, setAddress] = useState('');
  const [disabled, setDisabled] = useState('');
  const [readyToGo, setReadyToGo] = useState('');
  const [currentTab, setCurrentTab] = useState('');
  /*-----------------------------------------
   * 지갑 분석 결과를 위한 변수들
   *---------------------------------------*/
  const [resBalance, setResBalance] = useState('');
  /*----------------
   * 함수들
   *-------------*/
  const init = () => {
    setReadyToGo(false);
  };

  const handleChange = ({ target: { value } }) => setAddress(value);

  const handleCheckAddress = async (event) => {
    setDisabled(true);
    event.preventDefault();
    await new Promise((r) => setTimeout(r, 180));

    if (address.substr(0, 2) !== '0x') {
      alert('이건 주소가 아니야...');
      너굴맨의분노게이지 += 1;
    } else if (address.length !== 42) {
      alert('이건 주소가 아니야...');
      너굴맨의분노게이지 += 1;
    } else {
      setReadyToGo(true);

      const _balance = api.account.balance(address);
      _balance.then(function (balanceData) {
        setResBalance(balanceData);
        console.log(resBalance);
        console.log(balanceData.result / 1000000000000000000);
      });

      setCurrentTab('paperHand');

      // address // type: string
    }

    if (너굴맨의분노게이지 >= 5) {
      alert('거기까지다...');
      alert('이 너굴맨은 너에게 충분한 기회를 줬어.');
      alert('맘 같아선 당장 내쫓고 싶지만 한 번 더 기회를 주겠어');
      alert('다음 기회에는 좀 더 잘 해보라고');
      location.reload();
    }
    setDisabled(false);
  };

  const renderPaperHand = () => (
    <>
      <div className="container">
        페이퍼핸드 분석 결과
        <div className="result-text">
          <br /> 지갑 잔액 :{' '}
          {String(resBalance.result / 1000000000000000000).substr(0, 5)} ETH{' '}
          <br />
        </div>
      </div>
    </>
  );

  const renderDiamondHand = () => (
    <>
      <div className="container">
        다이아핸드 분석 결과
        <div className="result-text">
          <br /> 지갑 잔액 :{' '}
          {String(resBalance.result / 1000000000000000000).substr(0, 5)} ETH{' '}
          <br />
        </div>
      </div>
    </>
  );

  const renderResult = () => (
    <>
      <div className="container">
        <img
          alt="paperhand"
          src="https://images.velog.io/images/c0np4nn4/post/231b5485-7595-436f-8580-4560d68c0570/goodNGM.gif"
          className="image2"
        ></img>
        <div className="signin-text">
          <br />
          지갑 분석 결과(준비중)는 밑에 있어
        </div>
        <div className="button-container">
          <button
            className="handButton"
            type="button"
            onClick={() => setCurrentTab('paperHand')}
          >
            <img src={PaperHand} alt="Paper Hand" className="iconImage"></img>
          </button>

          <button
            className="handButton"
            type="button"
            onClick={() => setCurrentTab('diamondHand')}
          >
            <img
              src={DiamondHand}
              alt="Diamond Hand"
              className="iconImage"
            ></img>
          </button>
        </div>
        <div className="resultHandType">
          지갑 주소 : {address}
          {currentTab === 'paperHand' ? renderPaperHand() : renderDiamondHand()}
        </div>
        # -------- 이 아래에 지갑 관련 내용 넣어야 함 -------------
        <div className="footer">
          version 1.0.0
          <br />
          made by c0np4nn4
        </div>
      </div>
    </>
  );

  const renderPrePage = () => (
    <>
      <div className="container">
        <div className="error">Please connect to Ethereum network.</div>

        <div className="signin-text">
          안녕!
          <br />
          지갑 분석도 이 너굴맨이 처리했으니 안심하라구~
        </div>
        <form onSubmit={handleCheckAddress}>
          <div className="search-address">
            <span className="search-icon"></span>
            <input
              type="text"
              className="form-control"
              placeholder="적절한 MetaMask 지갑 주소를 입력해봐!"
              value={address}
              onChange={handleChange}
            />
          </div>
        </form>

        <img
          alt="NGM"
          src="https://media.vlpt.us/images/c0np4nn4/post/e91dbe9d-5dcf-4d80-a3a7-7759599fa831/1bd7453343646f106926d6d05f85cd77cb28b0be4679593ca208a4cd0fbd88075e5592f731f61a75f2677f1a692e1d17c97409aac72224c573e3592067df7a1733b60b02199eb7914edaf8752668df22b42180ae6df6ff897ff9b97c0e19e8ae.png"
          className="image"
        ></img>

        <div className="footer">
          version 1.0.0
          <br />
          made by c0np4nn4
        </div>
      </div>
    </>
  );

  useEffect(() => {
    init();
  }, []);

  return (
    <div className="App">
      {readyToGo === false ? renderPrePage() : renderResult()}
    </div>
  );
};

export default App;
