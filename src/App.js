import React, {useEffect, useState} from 'react';
import './App.css';
import './themify.css';
import logo from './logo.svg';
import dark_logo from './dark_logo.svg';
import notreddit from './notreddit.svg';


function xhrGET(url, callback) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.repsonseType = 'json';
    xhr.onload = function(e) {
        callback(xhr.response, xhr.status);
    }
    xhr.send();
}

function Post(props) {
    const {post} = props;
    const post_id = `post_wrapper_for_post_${post.id}`;
    return (
        <div id={post_id} className='post_wrapper'>
            <div className='post_wrapper_inner'>
                <div className='post_vote_bar'></div>
                <div className='post'>
                    <div className='post_header'></div>
                    <div className='post_content'>{post.id} - {post.title}</div>
                </div>
            </div>
        </div>
    )
}

function PostListFilterBar(props) {
    const icons = [
        {'id': 1, 'title': 'Best', 'icon': 'ti-crown', 'href': '#'},
        {'id': 2, 'title': 'Hot', 'icon': 'ti-rocket', 'href': '#'},
        {'id': 3, 'title': 'New', 'icon': 'ti-target', 'href': '#'},
        {'id': 4, 'title': 'Top', 'icon': 'ti-stats-up', 'href': '#'},
    ]
    return(
        <div id='post_list_filter_bar_wrapper'>
            <div id='post_list_filter_bar_inner'>
                <div id='post_list_filter_bar_icons_wrapper'>
                    {icons.map(function(i) {
                        return (
                            <div key={i.id} className='post_list_filter_bar_icon_wrapper'>
                                <div className='post_list_filter_bar_icon'>
                                    <a className='post_list_filter_bar_iconbar_link' title={i.title} href={i.href}>
                                    <i className={i.icon}></i>
                                    <span>{i.title}</span>
                                    </a>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

function PostListCreateBar(props) {
    const icons = [
        {'id': 1, 'title': 'Home', 'icon': 'ti-image', 'href': '#'},
        {'id': 2, 'title': 'Account', 'icon': 'ti-link', 'href': '#'},
    ]
    return (
        <div id='post_list_create_bar_wrapper'>
            <div id='post_list_create_bar_inner'>
                <div id='post_list_create_bar_logo'>
                    <img src={dark_logo} id="logo_icon_dark" alt="logo_icon_dark" />
                </div>
                <div id='post_list_create_bar_input_wrapper'>
                    <input id='post_list_create_bar_input' placeholder='Create Post'/>
                </div>
                <div id='post_list_create_bar_iconbar_wrapper'>
                    {icons.map(function(i) {
                        return (
                            <div key={i.id} className='post_list_create_bar_icon'>
                                <a className='post_list_create_bar_iconbar_link' title={i.title} href={i.href}><i className={i.icon}></i></a>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

function TopCommunitiesEl() {
    return (
        <div id='top_communities_wrapper'>
            <div id='top_communities_inner' className='generic_box_wrapper'></div>
        </div>
    )
}

function RedditPremiumEl() {
    return (
        <div id='reddit_premium_wrapper'>
            <div id='reddit_premium_inner' className='generic_box_wrapper'></div>
        </div>
    )
}

function CreatePostCommunityEl() {
    return (
        <div id='create_post_community_wrapper'>
            <div id='create_post_community_inner' className='generic_box_wrapper'></div>
        </div>
    )
}

function RecentPostsEl() {
    return (
        <div id='recent_posts_wrapper'>
            <div id='recent_posts_inner' className='generic_box_wrapper'></div>
        </div>
    )
}

function NotRedditInfoEl() {
    return (
        <div id='notreddit_info_wrapper'>
            <div id='notreddit_info_inner' className='generic_box_wrapper'></div>
        </div>
    )
}

function MetricsWrapper() {
    return (
        <div id='metrics_wrapper'>
            <div id='metrics_wrapper_inner'>
                <RedditPremiumEl />
                <TopCommunitiesEl />
                <RecentPostsEl />
                <CreatePostCommunityEl />
                <NotRedditInfoEl />
            </div>
        </div>
    )
}

function PostList(props) {
    const [posts, setPosts] = useState([]);
    const fetch_url = 'http://127.0.0.1:8000/api/posts';
    useEffect(function() {
        const callback = function(response, status) {
            setPosts(JSON.parse(response));
        }
        xhrGET(fetch_url, callback);
    }, [])
    return (
        <div id='post_list_wrapper'>
            <div id='post_list_inner'>
                <PostListCreateBar />
                <PostListFilterBar />
                {posts.map((p) => {return <Post post={p} key={p.id}/>})}
            </div>
        </div>
    )
}

function PostWrapper(props) {
    return (
        <div id='posts_content_wrapper'>
            <div id='posts_content_inner'>
            <PostList />
            <MetricsWrapper />
            </div>
        </div>
    )
}

function TopNavbarLogo(props) {
    const home_redirect = function() {
        window.location.href='/';
    }
    return (
        <div id='top_navbar_logo'>
            <img onClick={home_redirect} src={logo} id="logo_icon" alt="logo_icon" />
            <img onClick={home_redirect} src={notreddit} id="logo_notreddit" alt="logo_notreddit" />
        </div>
    )
}

function CommunitySelect(props) {
    const [communities, setCommunities] = useState([]);
    const fetch_url = 'http://127.0.0.1:8000/api/communities';
    useEffect(function() {
        const callback = function(response, status) {
            setCommunities(JSON.parse(response));
        }
        xhrGET(fetch_url, callback);
    }, [])
    return (
        <div id='top_navbar_community_select_wrapper'>
            <div id='top_navbar_community_select_inner'>
                <select id='top_navbar_community_select'>
                    {communities.map(function(c) {return <option key={c.id} value={c.id}>nr/{c.title}</option>})}
                </select>
            </div>
        </div>
    )
}

function TopNavbarSearch(props) {
    return (
        <div id='top_navbar_search_wrapper'>
            <div id='top_navbar_search_inner'>
                <span id='top_navbar_search_icon'><i className='ti-search'></i></span>
                <input id='top_navbar_search' placeholder='Search Notreddit'/>
            </div>
        </div>
    )
}

function TopNavbarIconBar() {
    const icons = [
        {'id': 1, 'title': 'Home', 'icon': 'ti-home', 'href': '#'},
        {'id': 2, 'title': 'Account', 'icon': 'ti-user', 'href': '#'},
        {'id': 3, 'title': 'Email', 'icon': 'ti-email', 'href': '#'}
    ]
    return (
        <div id='top_navbar_iconbar_wrapper'>
            <div id='top_navbar_iconbar_inner'>
            {icons.map(function(i) {
                return (
                    <div key={i.id} className='top_navbar_iconbar_icon'>
                        <a className='top_navbar_iconbar_link' title={i.title} href={i.href}><i className={i.icon}></i></a>
                    </div>
                )
            })}
            </div>
        </div>
    )
}

function TopNavbar(props) {
    return (
        <div id='top_navbar_wrapper'>
            <div id='top_navbar_inner'>
                <TopNavbarLogo />
                <CommunitySelect />
                <TopNavbarSearch />
                <TopNavbarIconBar />
            </div>
        </div>
    )
}

function App() {
    return (
        <div className="App">
            <div id='main_wrapper'>
                <TopNavbar />
                <div id='main_content_wrapper'>
                    <PostWrapper />
                </div>
            </div>
        </div>
    );
}

export default App;
