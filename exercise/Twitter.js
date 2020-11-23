/**
 * 在 Twitter 函数中定义好数据结构
followMap：用户关注列表， 用 Set 数据类型不需要去处理重复数据，取消关注（从列表删除）也会更方便；
postMap：用户推文列表；
latestPostId：推文的自增id，用于后续获取推文列表时排序；

在 postTweet 函数中，将新增的 推文 { tweetId, postTime } 放到列表的最前面，并确保 latestPostId 自增；

在 follow 函数中，先检查 followMap 是否已存在 followerId 数据，若已存在，直接 add(followeeId), 若不存在，新增 new Set([followeeId])；
在 unfollow 函数中，直接检查是否存在 followMap[followerId] 列表，若存在直接delete(followeeId)；
在 getNewsFeed 函数中，因为要取用户和用户关注的用户的最新 10 条推文，所以只需要把这些用户的前10条推文取出来，再根据postTime去排序，然后取最新10条推文。
 */

var Twitter = function(){
    // 用户的关注名单 数据结构为 {1:Set,3:Set} Set为对应id:1 的关注名单
    this.followMap = {}
    // 每个用户发过的推 数据结构为 
    /**
     *     Map{1:[{tweetId,latestPostId},{tweetId,latestPostId}],
     *          3:[{tweetId,latestPostId},{tweetId,latestPostId}]
     *         }
     */
    this.postMap = new Map()
    // 最后的post的时间节点
    this.latestPostId = 0
}

/**
 * Compose a new tweet. 
 * @param {number} userId 
 * @param {number} tweetId
 * @return {void}
 */
Twitter.prototype.postTweet = function(userId, tweetId) {
    const postTime = this.latestPostId++
    let tweetList = [{tweetId,postTime}]
    if(this.postMap.has(userId)){
        tweetList = tweetList.concat(this.postMap.get(userId))
    }
    this.postMap.set(userId,tweetList)


};

/**
 * Retrieve the 10 most recent tweet ids in the user's news feed. Each item in the news feed must be posted by users who the user followed or by the user herself. Tweets must be ordered from most recent to least recent. 
 * @param {number} userId
 * @return {number[]}
 */
Twitter.prototype.getNewsFeed = function(userId) {
    const followeeIdList = this.followMap[userId] ? [...this.followMap[userId]]:[]
    const tweetList = []
    const userIds = [... new Set(followeeIdList.concat([userId]))]
    userIds.forEach(uid=>{
        if(this.postMap.has(uid)){
            tweetList.push(...this.postMap.get(uid).slice(0,10))
        }
    })
    tweetList.sort((a,b)=>{
        return b.postTime - a.postTime
    })
    
    return tweetList.slice(0,10).map(item=> item.tweetId)

};

/**
 * Follower follows a followee. If the operation is invalid, it should be a no-op. 
 * @param {number} followerId 
 * @param {number} followeeId
 * @return {void}
 */
Twitter.prototype.follow = function(followerId, followeeId) {
    if(this.followMap[followerId]){
        this.followMap[followerId].add(followeeId)
    }else{
        this.followMap[followerId] = new Set([followeeId])
    }
};

/**
 * Follower unfollows a followee. If the operation is invalid, it should be a no-op. 
 * @param {number} followerId 
 * @param {number} followeeId
 * @return {void}
 */
Twitter.prototype.unfollow = function(followerId, followeeId) {
    if(this.followMap[followerId]){
        this.followMap[followerId].delete(followeeId)
    }
};

/**
 * Your Twitter object will be instantiated and called as such:
 * var obj = new Twitter()
 * obj.postTweet(userId,tweetId)
 * var param_2 = obj.getNewsFeed(userId)
 * obj.follow(followerId,followeeId)
 * obj.unfollow(followerId,followeeId)
 */