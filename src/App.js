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

function PostVotebar(props) {
    const {post_id} = props;
    return (
        <div className='post_votebar_wrapper'>
            <div className='post_votebar_inner'>
                <div id={`votebar_for_post_${post_id}`} className='post_votebar'>
                    <div id={`upvote_button_for_post_${post_id}`} className='vote_button upvote'>
                        <svg fill="none" stroke-linejoin="round" stroke-width="32px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><title>ionicons-v5-b</title><path d="M448,256,272,88v96C103.57,184,64,304.77,64,424c48.61-62.24,91.6-96,208-96v96Z"/></svg>
                    </div>
                    <div id={`votebar_counter_for_post_${post_id}`} className='votevar_counter'>
                    --
                    </div>
                    <div id={`downvote_button_for_post_${post_id}`} className='vote_button downvote'>
                        <svg fill="none" stroke-linejoin="round" stroke-width="32px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><title>ionicons-v5-b</title><path d="M448,256,272,88v96C103.57,184,64,304.77,64,424c48.61-62.24,91.6-96,208-96v96Z"/></svg>
                    </div>
                </div>
            </div>
        </div>
    )
}

function PostActionBar(props) {
    const {post} = props;
    const actions = [
        {'id': 1, 'display': 'Comments', 'icon': 'ti-comment-alt'},
        {'id': 2, 'display': 'Award', 'icon': 'ti-gift'},
        {'id': 3, 'display': 'Share', 'icon': 'ti-share'},
    ]
    return (
        <div className='post_actionbar_wrapper'>
            <div className='post_actionbar_inner'>
                {actions.map(function(a) {
                    return(
                        <div className='post_action_wrapper'>
                            <a className='post_action'>
                                <i className={a.icon}></i>
                                <span>{a.display}</span>
                            </a>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

function Post(props) {
    const {post} = props;

    return (
        <div id={`post_wrapper_for_post_${post.id}`} className='post_wrapper'>
            <div className='post_wrapper_inner'>
            <PostVotebar post_id={post.id} />
                <div className='post_content_wrapper'>
                    <div className='post'>
                        <div className='post_header'>
                        <div className='post_header_title_wrapper'>
                            <a href={post.community}>{post.community}</a>
                        </div>
                        <div className='post_header_detail_wrapper'>
                            <div className='bullet_point'></div>Posted by {post.created_by} {post.posted_date}
                        </div>
                        </div>
                        <div className='post_content'>{post.body}</div>
                    </div>
                    <PostActionBar post={post}/>
                </div>
            </div>
        </div>
    )
}

function PostListFilterBar(props) {
    const icons = [
        {'id': 1, 'title': 'Best', 'icon': 'ti-crown', 'href': '#'},
        {'id': 2, 'title': 'Hot', 'icon': 'ti-rocket', 'href': '#'},
        {'id': 3, 'title': 'New', 'icon': 'ti-shine', 'href': '#'},
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

function TopCommunitiesElCommunity(props) {
    const {community} = props;
    return (
        <div className='top_communities_community_wrapper'>
            <div className='top_communities_community_inner'>
                <div className='top_communities_community_rank_wrapper'>
                    <div className='top_communities_community_rank'>{community.id}</div>
                    <div className='top_communities_community_trend'>
                        <i className='ti-angle-up community_trend'></i>
                    </div>
                </div>
                <div className='top_communities_community_name'>
                    <a href={community.url}>nr/{community.title}</a>
                </div>
                <div className='community_join_button_wrapper'>
                    <a href={community.url} className='rounded_button_link community_join'>Join</a>
                </div>
            </div>
        </div>
    )
}

function TopCommunitiesEl(props) {
    const [communities, setCommunities] = useState([]);
    const fetch_url = 'http://127.0.0.1:8000/api/communities';
    useEffect(function() {
        const callback = function(response, status) {
            setCommunities(JSON.parse(response));
        }
        xhrGET(fetch_url, callback);
    }, [])
    return (
        <div id='top_communities_wrapper'>
            <div id='top_communities_inner' className='generic_box_wrapper'>
                <div id='top_communities_rank_wrapper'>
                    {communities.map(function(c) {
                        return (
                            <TopCommunitiesElCommunity key={c.id} community={c} />
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

function RedditPremiumEl(props) {
    return (
        <div id='notreddit_premium_wrapper'>
            <div id='notreddit_premium_inner' className='generic_box_wrapper'>
                <div id='notreddit_premium_header'>
                    <div id='notreddit_premium_icon_wrapper'>
                        <i id='notreddit_premium_icon' className='ti-medall'></i>
                    </div>
                    <div id='notreddit_premium_text'>
                        <span id='notreddit_premium_text_title'>NotReddit Premium</span>
                        <span>The best NotReddit experience, with monthly Coins</span>
                    </div>
                </div>
                <div id='notreddit_premium_link_wrapper'>
                    <div id='notreddit_premium_link'>
                        <a className='rounded_button_link' href='/premium'>Try Now</a>
                    </div>
                </div>
            </div>
        </div>
    )
}

function NotRedditInfoEl(props) {
    return (
        <div id='notreddit_info_wrapper'>
            <div id='notreddit_info_inner' className='generic_box_wrapper'>
                <div id='notreddit_info_link_wrapper'>
                    <a href='/help'>Help</a>
                    <a href='/notredditcoins'>NotReddit Coins</a>
                    <a href='/notredditpremium'>NotRedditPremium</a>
                    <a href='/about'>About</a>
                    <a href='/terms'>Terms & Conditions</a>
                    <a href='/contentpolicy'>Content Policy</a>
                    <a href='/privacypolicy'>Privacy Policy</a>
                    <a href='/modpolicy'>Mod Policy</a>
                </div>
                <div id='notreddit_info_disclaimer'>
                    <span>NotReddit Inc © 2022. Does not exist.</span>
                </div>
            </div>
        </div>
    )
}

function MetricsWrapper(props) {
    return (
        <div id='metrics_wrapper'>
            <div id='metrics_wrapper_inner'>
                <RedditPremiumEl />
                <TopCommunitiesEl />
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
        {'id': 3, 'title': 'Messages', 'icon': 'ti-email', 'href': '#'},
        {'id': 4, 'title': 'Notifications', 'icon': 'ti-bell', 'href': '#'}
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
