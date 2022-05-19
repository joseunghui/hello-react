import React, { Component } from "react";
import './ValidationSample.css';

class ValidationSample extends Component {
    state = {
        password : '',
        clicked : false,
        validated : false
    }

    // input 값으로 password 값 설정
    handleChange = (e) => {
        this.setState({
            password : e.target.value
        });
    }

    // 버튼을 클릭하면 입력한 password 값이 0000과 동일한지 확인
    handleButtonClick = () => {
        this.setState({
            clicked : true,
            validated : this.state.password === '0000'
        });
        // ref 추가
        this.input.focus();
    }

    render() {
        return(
            <div>
                <input 
                    type="password"
                    value={this.state.password}
                    onChange={this.handleChange}
                    className={this.state.clicked ? (this.state.validated ? 'success' : 'failure') : ''}
                    ref={(ref) => this.input=ref}
                />
                <button onClick={this.handleButtonClick}>검증하기</button>
            </div>
        );
    }
}
export default ValidationSample;