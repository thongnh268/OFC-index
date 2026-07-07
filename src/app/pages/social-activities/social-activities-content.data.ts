import { type InnerContentBlock } from '../../shared/components/inner-content/inner-content.component';

// Code-owned bilingual content for the Social Activities page (linked from SECONDARY_NAV).
// Copy is real company text (Vietnamese is a working translation for review). This page has no
// sidebar scroll-spy, so blocks carry no ids; the shell, sidebar and CTA come from app-inner-page.
export interface SocialActivitiesContent {
  readonly breadcrumbHome: string;
  readonly title: string;
  readonly blocks: readonly InnerContentBlock[];
}

const EN: SocialActivitiesContent = {
  breadcrumbHome: 'Homepage',
  title: 'Social Activities',
  blocks: [
    {
      heading: 'Spreading Value – Joining Hands for the Community',
      paragraphs: [
        'At Dai Duong Forest Products Processing Joint Stock Company, we believe that sustainable development is measured not only by business and production efficiency but also by the positive values brought to the community and society.',
        'Throughout our operations, Dai Duong has always highly regarded social responsibility, considering it an inseparable part of our corporate development strategy. Besides creating stable jobs for workers, we continuously implement community-oriented programs, contributing to improving the quality of life and promoting sustainable development locally.',
      ],
    },
    {
      heading: 'Standing with Employees',
      paragraphs: [
        'People are the foundation of all success. Dai Duong always focuses on building a safe, professional, and humane working environment, ensuring full welfare benefits, insurance, and working conditions for employees.',
        'The company regularly organizes cultural, sporting, tourism, vacation activities, and team-building programs to enhance the spiritual life of our staff and employees.',
      ],
    },
    {
      heading: 'Joining Hands for the Local Community',
      paragraphs: [
        'With the desire to share and spread love, Dai Duong actively participates in local social welfare programs such as:',
      ],
      list: [
        'Visiting and presenting gifts to families under preferential treatment policies and individuals with meritorious services to the revolution.',
        'Supporting households in difficult circumstances.',
        'Accompanying programs that promote education and talent.',
        'Supporting compatriots affected by natural disasters, storms, and floods.',
        'Participating in volunteer activities and community movements.',
      ],
    },
    {
      paragraphs: [
        'Every activity demonstrates our sense of responsibility and desire to contribute to the overall development of society.',
      ],
    },
    {
      heading: 'Developing with a Green Environment',
      paragraphs: [
        'As an enterprise operating in the forestry sector, Dai Duong is deeply aware of its responsibility in protecting forest resources and the environment.',
        'We prioritize the use of legal raw materials, promote sustainable forest management, apply international standards such as FSC and PEFC, and continuously improve our production processes to minimize environmental impact.',
      ],
    },
    {
      heading: 'Commitment to a Sustainable Future',
      paragraphs: [
        'Dai Duong understands that business success is always linked to the development of the community and the environment. Therefore, we are committed to continuing to implement practical social responsibility programs, creating positive values ​​for our employees, customers, partners, and society.',
      ],
    },
    {
      paragraphs: [
        '<accent>Every product created brings not only economic value but is also a commitment from Dai Duong to people, the community, and a green future for generations to come</accent>',
      ],
    },
  ],
};

const VI: SocialActivitiesContent = {
  breadcrumbHome: 'Trang chủ',
  title: 'Hoạt động xã hội',
  blocks: [
    {
      heading: 'Lan tỏa giá trị – Chung tay vì cộng đồng',
      paragraphs: [
        'Tại Công ty Cổ phần Chế biến Lâm sản Đại Dương, chúng tôi tin rằng sự phát triển bền vững không chỉ được đo bằng hiệu quả kinh doanh và sản xuất, mà còn bằng những giá trị tích cực mang lại cho cộng đồng và xã hội.',
        'Trong suốt quá trình hoạt động, Đại Dương luôn đề cao trách nhiệm xã hội, xem đây là một phần không thể tách rời trong chiến lược phát triển của doanh nghiệp. Bên cạnh việc tạo công ăn việc làm ổn định cho người lao động, chúng tôi liên tục triển khai các chương trình hướng đến cộng đồng, góp phần nâng cao chất lượng cuộc sống và thúc đẩy phát triển bền vững tại địa phương.',
      ],
    },
    {
      heading: 'Đồng hành cùng người lao động',
      paragraphs: [
        'Con người là nền tảng của mọi thành công. Đại Dương luôn chú trọng xây dựng môi trường làm việc an toàn, chuyên nghiệp và nhân văn, đảm bảo đầy đủ phúc lợi, bảo hiểm và điều kiện làm việc cho người lao động.',
        'Công ty thường xuyên tổ chức các hoạt động văn hóa, thể thao, du lịch, nghỉ dưỡng và các chương trình team-building nhằm nâng cao đời sống tinh thần cho cán bộ, nhân viên.',
      ],
    },
    {
      heading: 'Chung tay vì cộng đồng địa phương',
      paragraphs: [
        'Với mong muốn sẻ chia và lan tỏa yêu thương, Đại Dương tích cực tham gia các chương trình an sinh xã hội tại địa phương như:',
      ],
      list: [
        'Thăm hỏi, tặng quà các gia đình chính sách và những cá nhân có công với cách mạng.',
        'Hỗ trợ các hộ gia đình có hoàn cảnh khó khăn.',
        'Đồng hành cùng các chương trình khuyến học, khuyến tài.',
        'Hỗ trợ đồng bào bị ảnh hưởng bởi thiên tai, bão lũ.',
        'Tham gia các hoạt động tình nguyện và phong trào cộng đồng.',
      ],
    },
    {
      paragraphs: [
        'Mỗi hoạt động đều thể hiện tinh thần trách nhiệm và mong muốn đóng góp vào sự phát triển chung của xã hội.',
      ],
    },
    {
      heading: 'Phát triển cùng môi trường xanh',
      paragraphs: [
        'Là doanh nghiệp hoạt động trong lĩnh vực lâm nghiệp, Đại Dương nhận thức sâu sắc trách nhiệm của mình trong việc bảo vệ tài nguyên rừng và môi trường.',
        'Chúng tôi ưu tiên sử dụng nguyên liệu hợp pháp, thúc đẩy quản lý rừng bền vững, áp dụng các tiêu chuẩn quốc tế như FSC và PEFC, và không ngừng cải tiến quy trình sản xuất nhằm giảm thiểu tác động đến môi trường.',
      ],
    },
    {
      heading: 'Cam kết vì một tương lai bền vững',
      paragraphs: [
        'Đại Dương hiểu rằng sự thành công của doanh nghiệp luôn gắn liền với sự phát triển của cộng đồng và môi trường. Vì vậy, chúng tôi cam kết tiếp tục triển khai các chương trình trách nhiệm xã hội thiết thực, tạo ra những giá trị tích cực cho nhân viên, khách hàng, đối tác và xã hội.',
      ],
    },
    {
      paragraphs: [
        '<accent>Mỗi sản phẩm được tạo ra không chỉ mang lại giá trị kinh tế mà còn là cam kết của Đại Dương với con người, cộng đồng và một tương lai xanh cho các thế hệ mai sau</accent>',
      ],
    },
  ],
};

export function socialActivitiesContent(locale: string): SocialActivitiesContent {
  return locale.startsWith('vi') ? VI : EN;
}
