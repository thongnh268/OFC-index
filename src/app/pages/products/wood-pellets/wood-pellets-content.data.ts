import { type ProductContent } from '../../../shared/components/product-page/product-content.model';

// Code-owned bilingual content for the Wood Pellets Export page (Figma node 2142:1503).
// Title, intro, badges, overview, specs and applications are real design content. Why-choose,
// the video blurb and `videoUrl` are shared OFC/company content carried across product pages
// (placeholder video - swap for the real link). FAQ is neutral OFC-grounded provisional copy
// (Milestones approach). Banner/overview images stay null → styled placeholders.

const EN: ProductContent = {
  name: 'Wood Pellets Export',
  title: 'Wood Pellets Export',
  intro:
    'We provide high-quality acacia wood pellets for pulp, paper and energy industries. Stable supply, consistent quality and sustainable sourcing from Vietnam.',
  bannerImage: 'assets/images/products/wood-pellets-banner.jpg',
  bannerAlt: 'Wood pellets export',
  badges: [
    { icon: 'truck', label: 'Stable Supply' },
    { icon: 'circleCheck', label: 'Consistent Quality' },
    { icon: 'leaf', label: 'Sustainable Source' },
  ],
  overview: [
    'Dried wood chips and shavings are ground and compressed through 8 mm dies under high pressure. The heat generated activates natural lignin in the wood fibers, binding the pellets together without added agents.',
    'No glues or chemical additives are used, resulting in a clean, sustainable fuel with efficient combustion and reliable energy performance.',
  ],
  overviewImage: 'assets/images/products/wood-pellets-overview.webp',
  overviewImageAlt: 'Wood pellet production line',
  specs: [
    { label: 'Product Name', value: 'Wood Pellets' },
    { label: 'Material', value: 'Acacia' },
    { label: 'Diameter', value: '6, 8 or 10 mm' },
    { label: 'Length', value: '10-50 mm' },
    { label: 'Moisture', value: '< 10 - 12 %' },
    { label: 'Ash Content', value: '< 1.5 - 3.0' },
    { label: 'Calorific Value', value: '> 4200 kcal/kg' },
    { label: 'Durability', value: '> 96.5 %' },
    { label: 'Bulk Density', value: '600-750 kg/m³' },
    { label: 'Fines', value: '< 2.0 - 3.0 %' },
    { label: 'Sulfur', value: '< 0.05 %' },
  ],
  applicationsIntro: 'Our wood pellets are widely used in multiple industries.',
  applications: [
    { icon: 'home', title: 'Home Heating', description: 'Efficient fuel for stoves and boilers' },
    { icon: 'bolt', title: 'Power Generation', description: 'Biomass fuel for industrial energy' },
    { icon: 'feather', title: 'Animal Bedding', description: 'Absorbent bedding for livestock' },
    { icon: 'paw', title: 'Cat Litter', description: 'Natural and biodegradable litter' },
    { icon: 'flame', title: 'BBQ & Smoking', description: 'Authentic wood-fired flavor' },
    {
      icon: 'plant',
      title: 'Landscaping Mulch',
      description: 'Moisture retention and weed control',
    },
    { icon: 'seedling', title: 'Greenhouses', description: 'Sustainable heating for agriculture' },
    {
      icon: 'factory',
      title: 'Commercial Heating',
      description: 'Cost-effective fuel for large facilities',
    },
  ],
  whyChoose: [
    { icon: 'ship', title: 'Export Success', description: 'Exported to China, Japan, and Korea' },
    {
      icon: 'chartBar',
      title: 'Capacity & Quality',
      description: 'Production capacity of 1 million BDMT/ year',
    },
    {
      icon: 'certificate',
      title: 'Certifications',
      description: 'PEFC FM/COC wood chips certification',
    },
    {
      icon: 'factory',
      title: 'Future Plans',
      description: '$24 million wood chips and pellets factory',
    },
  ],
  videoEyebrow: 'OFC Company',
  videoTitle: 'A Leading Wood Chips Producer',
  videoParagraphs: [
    'OFC Company, based in Vietnam, has emerged as a prominent player in the wood chips market.',
    'With a commitment to sustainable forestry practices, they have become a reliable supplier of high-quality wood chips to international markets.',
  ],
  videoUrl: 'https://youtu.be/6Fs5kLkIDzY',
  videoThumbnail: null,
  faqs: [
    {
      question: 'What are wood pellets?',
      answer:
        'Wood pellets are compressed cylinders of dried acacia wood fibre extruded through 8 mm dies. The wood’s natural lignin binds them, so no glue or chemical additives are needed.',
    },
    {
      question: 'What heating value do they deliver?',
      answer:
        'Our pellets have a calorific value above 4,200 kcal/kg with low ash (< 3%) and high durability (> 96.5%), making them an efficient, clean-burning fuel.',
    },
    {
      question: 'What sizes do you offer?',
      answer:
        'Standard diameters are 6, 8 or 10 mm with lengths of 10–50 mm; we can tailor specifications to your equipment.',
    },
    {
      question: 'Are the pellets certified and sustainably sourced?',
      answer:
        'Yes - they are made from sustainably grown acacia and our supply chain holds PEFC FM/COC certification.',
    },
    {
      question: 'What are your order and payment terms?',
      answer:
        'We export in bulk to China, Japan and Korea and accept T/T and L/C at sight. Contact us for a detailed quotation.',
    },
  ],
};

const VI: ProductContent = {
  name: 'Xuất khẩu viên nén gỗ',
  title: 'Xuất khẩu viên nén gỗ',
  intro:
    'Chúng tôi cung cấp viên nén gỗ keo chất lượng cao cho ngành giấy, bột giấy và năng lượng. Nguồn cung ổn định, chất lượng đồng đều và khai thác bền vững từ Việt Nam.',
  bannerImage: 'assets/images/products/wood-pellets-banner.jpg',
  bannerAlt: 'Xuất khẩu viên nén gỗ',
  badges: [
    { icon: 'truck', label: 'Nguồn cung ổn định' },
    { icon: 'circleCheck', label: 'Chất lượng đồng đều' },
    { icon: 'leaf', label: 'Khai thác bền vững' },
  ],
  overview: [
    'Dăm gỗ và phoi bào khô được nghiền và ép qua khuôn 8 mm dưới áp suất cao. Nhiệt sinh ra kích hoạt lignin tự nhiên trong sợi gỗ, kết dính các viên nén lại với nhau mà không cần phụ gia.',
    'Không sử dụng keo hay phụ gia hóa học, tạo ra nhiên liệu sạch, bền vững với khả năng cháy hiệu quả và hiệu suất năng lượng ổn định.',
  ],
  overviewImage: 'assets/images/products/wood-pellets-overview.webp',
  overviewImageAlt: 'Dây chuyền sản xuất viên nén gỗ',
  specs: [
    { label: 'Tên sản phẩm', value: 'Viên nén gỗ' },
    { label: 'Nguyên liệu', value: 'Gỗ keo' },
    { label: 'Đường kính', value: '6, 8 hoặc 10 mm' },
    { label: 'Chiều dài', value: '10-50 mm' },
    { label: 'Độ ẩm', value: '< 10 - 12 %' },
    { label: 'Hàm lượng tro', value: '< 1.5 - 3.0' },
    { label: 'Nhiệt trị', value: '> 4200 kcal/kg' },
    { label: 'Độ bền', value: '> 96.5 %' },
    { label: 'Khối lượng riêng', value: '600-750 kg/m³' },
    { label: 'Mạt vụn', value: '< 2.0 - 3.0 %' },
    { label: 'Lưu huỳnh', value: '< 0.05 %' },
  ],
  applicationsIntro: 'Viên nén gỗ của chúng tôi được sử dụng rộng rãi trong nhiều ngành.',
  applications: [
    {
      icon: 'home',
      title: 'Sưởi ấm gia đình',
      description: 'Nhiên liệu hiệu quả cho bếp và lò sưởi',
    },
    {
      icon: 'bolt',
      title: 'Phát điện',
      description: 'Nhiên liệu sinh khối cho năng lượng công nghiệp',
    },
    { icon: 'feather', title: 'Lót chuồng', description: 'Vật liệu lót thấm hút cho vật nuôi' },
    { icon: 'paw', title: 'Cát vệ sinh', description: 'Cát tự nhiên, phân hủy sinh học' },
    { icon: 'flame', title: 'BBQ & xông khói', description: 'Hương vị nướng củi đích thực' },
    { icon: 'plant', title: 'Phủ gốc cảnh quan', description: 'Giữ ẩm và hạn chế cỏ dại' },
    { icon: 'seedling', title: 'Nhà kính', description: 'Sưởi ấm bền vững cho nông nghiệp' },
    {
      icon: 'factory',
      title: 'Sưởi thương mại',
      description: 'Nhiên liệu tiết kiệm cho cơ sở lớn',
    },
  ],
  whyChoose: [
    {
      icon: 'ship',
      title: 'Xuất khẩu thành công',
      description: 'Đã xuất khẩu sang Trung Quốc, Nhật Bản và Hàn Quốc',
    },
    {
      icon: 'chartBar',
      title: 'Công suất & chất lượng',
      description: 'Công suất sản xuất 1 triệu BDMT/năm',
    },
    { icon: 'certificate', title: 'Chứng nhận', description: 'Chứng nhận PEFC FM/COC cho dăm gỗ' },
    {
      icon: 'factory',
      title: 'Kế hoạch tương lai',
      description: 'Nhà máy dăm gỗ và viên nén trị giá 24 triệu USD',
    },
  ],
  videoEyebrow: 'OFC Company',
  videoTitle: 'Nhà sản xuất dăm gỗ hàng đầu',
  videoParagraphs: [
    'OFC Company, có trụ sở tại Việt Nam, đã trở thành một tên tuổi nổi bật trên thị trường dăm gỗ.',
    'Với cam kết về lâm nghiệp bền vững, công ty đã trở thành nhà cung cấp dăm gỗ chất lượng cao đáng tin cậy cho thị trường quốc tế.',
  ],
  videoUrl: 'https://youtu.be/6Fs5kLkIDzY',
  videoThumbnail: null,
  faqs: [
    {
      question: 'Viên nén gỗ là gì?',
      answer:
        'Viên nén gỗ là những thanh trụ nén từ sợi gỗ keo khô, ép qua khuôn 8 mm. Lignin tự nhiên trong gỗ kết dính chúng nên không cần keo hay phụ gia hóa học.',
    },
    {
      question: 'Nhiệt trị của viên nén là bao nhiêu?',
      answer:
        'Viên nén của chúng tôi có nhiệt trị trên 4.200 kcal/kg, hàm lượng tro thấp (< 3%) và độ bền cao (> 96,5%), là nhiên liệu sạch và hiệu quả.',
    },
    {
      question: 'Có những kích cỡ nào?',
      answer:
        'Đường kính tiêu chuẩn 6, 8 hoặc 10 mm, chiều dài 10–50 mm; chúng tôi có thể điều chỉnh theo thiết bị của bạn.',
    },
    {
      question: 'Viên nén có chứng nhận và nguồn bền vững không?',
      answer:
        'Có - được làm từ gỗ keo trồng bền vững và chuỗi cung ứng đạt chứng nhận PEFC FM/COC.',
    },
    {
      question: 'Điều khoản đặt hàng và thanh toán?',
      answer:
        'Chúng tôi xuất khẩu số lượng lớn sang Trung Quốc, Nhật Bản và Hàn Quốc, chấp nhận T/T và L/C trả ngay. Hãy liên hệ để nhận báo giá.',
    },
  ],
};

export function woodPelletsContent(locale: string): ProductContent {
  return locale.startsWith('vi') ? VI : EN;
}
