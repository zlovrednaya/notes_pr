import React from 'react';
import ReactDOM from 'react-dom';
import ReactPaginate from 'react-paginate';
import Progress from 'react-progress-2';
import 'react-progress-2/main.css';
import PostContent from './PostContent';

class ReactPagination extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			posts: [],
			completed: false,
			pageCount: 1,
			currentPage: 1
		};

		this.handlePageClick = this.handlePageClick.bind(this);
	}

	getQueryStringValue(key) {
		const value = decodeURIComponent(
			window.location.search.replace(
				new RegExp(
					'^(?:.*[&\\?]' +
						encodeURIComponent(key).replace(/[\.\+\*]/g, '\\$&') +
						'(?:\\=([^&]*))?)?.*$',
					'i'
				),
				'$1'
			)
		);
		return value ? value : null;
	}

	async componentDidMount() {
		const page = this.getQueryStringValue('page');
		await Promise.resolve(
			this.setState(() => ({ currentPage: page ? page : 1 }))
		);

		this.getPostData();
	}

	async handlePageClick(data) {
		const page = data.selected >= 0 ? data.selected + 1 : 0;
		await Promise.resolve(this.setState(() => ({ currentPage: page })));

		this.getPostData();
	}

	async getPostData() {
		Progress.show();

		if (history.pushState) {
			const newUrl =
				window.location.protocol +
				'//' +
				window.location.host +
				window.location.pathname +
				'?page=' +
				this.state.currentPage;
			window.history.pushState({ path: newUrl }, '', newUrl);

			const response = await axios.post(newUrl);

			try {
				if (response.data.status == 'success') {
					this.setState(() => ({
						posts: response.data.data.posts.data,
						currentPage: response.data.data.posts.current_page,
						pageCount: response.data.data.posts.last_page
					}));
					window.scrollTo(0, 0);
					Progress.hide();
				} else {
					Progress.hide();
					console.log(error);
				}
			} catch (error) {
				Progress.hide();
				console.log(error);
			}
		}
	}

	render() {
		const Posts = this.state.posts.map(post => (
			<PostContent key={post.id} post={post} />
		));

		return (
			<div>
				<Progress.Component
					style={{ background: '#99999978', height: '5px' }}
					thumbStyle={{ background: '#5900b3', height: '5px' }}
				/>

				{Posts.length > 0 && Posts}

				<ReactPaginate
					pageCount={this.state.pageCount}
					initialPage={this.state.currentPage - 1}
					forcePage={this.state.currentPage - 1}
					pageRangeDisplayed={4}
					marginPagesDisplayed={2}
					previousLabel="&#x276E;"
					nextLabel="&#x276F;"
					containerClassName="uk-pagination uk-flex-center"
					activeClassName="uk-active"
					disabledClassName="uk-disabled"
					onPageChange={this.handlePageClick}
					disableInitialCallback={true}
				/>
			</div>
		);
	}
}

if (document.getElementById('react-pagination-list')) {
	ReactDOM.render(
		<ReactPagination />,
		document.getElementById('react-pagination-list')
	);
}