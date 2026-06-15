// ============================================================
// 💕 这是你唯一需要修改的文件
// 把下面所有占位内容替换成你们真实的故事就好了
// ============================================================

export const config = {
  // 纪念日日期
  anniversaryDate: '2026-06-15',

  // 首屏专属情话（一句话，会在首屏以手写字体显示）
  loveQuote: '遇见你，是我这辈子最幸运的事',

  // 时间节点（重要的日子）
  // photos: 每个节点可以放多张照片，src 写 /images/文件名.jpg，caption 是照片说明
  // 如果暂时没有照片，photos 留空数组 [] 即可，点击后只显示文字
  timeline: [
    {
      date: '2024-06-15',
      title: '初次相遇',
      desc: '那天阳光很好，我看见了你，然后就再也忘不掉了。',
      emoji: '🌸',
      photos: [
        { src: '/images/photo2.jpg', caption: '我们第一次见面的地方' },
        { src: '/images/photo1.jpg', caption: '那天的你' },
      ],
    },
    {
      date: '2024-07-26',
      title: '第一次去台州',
      desc: '我们一起吃了很久的饭，走了好多的路。',
      emoji: '☕',
      photos: [
        { src: '/images/photo3.jpg', caption: '在台州' },
      ],
    },
    {
      date: '2024-08-14',
      title: '第一次去上海',
      desc: '我们拍了很多和合照，那一刻，我是世界上最幸福的人。',
      emoji: '💕',
      photos: [
        { src: '/images/photo5.jpg', caption: '在一起的第一天' },
      ],
    },
    {
      date: '2025-06-15',
      title: '一周年纪念',
      desc: '一年了，感谢你一直在。愿意再陪我走很多年吗？',
      emoji: '🎂',
      photos: [
        { src: '/images/photo4.jpg', caption: '一周年纪念日' },
      ],
    },
    {
      date: '2026-06-15',
      title: '两周年纪念',
      desc: '两年，730天，每一天都因为有你而变得不一样。',
      emoji: '🌹',
      photos: [],
    },
  ],

  // 日常点滴照片（src 换成你的照片路径，caption 是照片描述）
  // 把照片放到 public/images/ 目录下，src 写 /images/你的文件名.jpg
  photos: [
    { src: '/images/photo6.jpg', caption: '台州臭美照', emoji: '📷' },
    { src: '/images/photo7.jpg', caption: '大猫和可爱猫', emoji: '💑' },
    { src: '/images/photo8.jpg', caption: '你最美的样子', emoji: '✨' },
    { src: '/images/photo9.jpg', caption: '一起陶艺', emoji: '🍽️' },
    { src: '/images/photo10.jpg', caption: '海边下午', emoji: '🌤️' },
    { src: '/images/photo11.jpg', caption: '最性感的一张', emoji: '💖' },
  ],

  // 深情寄语（写给她的一段话）
  loveNote: `bb，\n\n两年了，我还是觉得每天和你在一起的时光过得太快。\n\n你记得我们第一次见面的时候吗？我记得，我记得每一个细节。\n从那以后，我就知道你会是我生命里很重要很重要的人。\n\n谢谢你愿意陪着我，谢谢你包容我所有的小脾气，\n谢谢你每次我低落的时候都在，谢谢你让我知道被人爱着是什么感觉。\n\n两周年快乐，我爱你。`,

  // 礼物盲盒（3 个礼物，先别告诉她内容，她抽到才揭晓）
  gifts: [
    {
      id: 1,
      name: 'KT 爱神花束',
      desc: '🌸 一束专属于你的爱神花束，\n已经悄悄准备好送到你手上了。',
      hint: '已经送啦 💝',
    },
    {
      id: 2,
      name: '刮刮乐',
      desc: '🎟️ 一张幸运刮刮乐，\n我们现在就去买，一起刮！',
      hint: '现在就去买 🛒',
    },
    {
      id: 3,
      name: '多多的新衣服',
      desc: '👗 送给你一件新衣服，\nbb 自己去挑，喜欢什么选什么！',
      hint: 'bb 自己挑选 🛍️',
    },
  ],

  // 情书内容（写给她的信，会在信封里）
  loveLetter: `bb，\n\n如果你能读到这封信，说明你已经读到了这封信。\n\n两年前的今天，我遇见这么好的你。\n你温柔、善良、有趣，你让我的生活变得有颜色。\n\n这两年里，我们一起经历了很多事情。\n有笑过的、哭过的、吵过嘴的、和好的——\n每一件，我都珍藏在心里。\n\n我不擅长说甜蜜的话，但我想让你知道，\n在我的世界里，你是最重要的那个人。\n\n谢谢你爱我。\n我也爱你，永远。\n\n今天的善龙\n2026.06.15`,
}

export type TimelineItem = typeof config.timeline[0]
export type PhotoItem = typeof config.photos[0]
export type GiftItem = typeof config.gifts[0]
