import React from 'react';
import ReactDOM from 'react-dom';


class PageModel extends React.Component {


	render() {
		

		return (
			<div>
			<span className="span-elt do action-elt" id="offsetEl" onClick={Offset.handleIncrement}>next page>></span>
			</div>
		);
	}
}


export default PageModel;