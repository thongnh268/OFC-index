import { type InnerContentBlock } from '../../../shared/components/inner-content/inner-content.component';

// Code-owned bilingual content for the Establishment Milestones page.
// NOTE: the Figma frame still ships only Lorem placeholder for this page's body. The copy
// below mirrors Figma's two-block / green-heading layout but uses neutral, OFC-grounded
// provisional wording (no literal "Lorem Ipsum") and must be replaced with the real company
// timeline once it is provided. Figma shows no banner here, so `bannerImage` stays null.
// The shell, sidebar and CTA around it are final.

export interface MilestonesContent {
  readonly breadcrumbHome: string;
  readonly breadcrumbAbout: string;
  readonly title: string;
  /** Banner image URL; null → no banner is shown. */
  readonly bannerImage: string | null;
  readonly body: readonly InnerContentBlock[];
}

const EN: MilestonesContent = {
  breadcrumbHome: 'Homepage',
  breadcrumbAbout: 'About us',
  title: 'Establishment Milestones',
  bannerImage: null,
  body: [
    {
      heading: 'Our journey',
      paragraphs: [
        'From its founding, OFC — operated by BINH MINH HP CO., LTD. — has grown from a regional wood-processing business into one of Vietnam’s trusted wood chip and pellet exporters. Headquartered in the Cai Lan Industrial Zone in Quang Ninh, the company built its reputation on consistent quality, reliable delivery and long-term partnerships with customers across Asia.',
        'Each stage of that growth has been guided by a simple commitment: to supply sustainable forest products that meet the exact specifications our partners depend on, shipment after shipment.',
      ],
    },
    {
      heading: 'Growth and milestones',
      paragraphs: [
        'As demand expanded, OFC scaled its operations to a production capacity of around one million BDMT per year and established steady export channels to China, Japan and Korea. Continued investment in facilities — including a planned wood chip and pellet factory — reflects the company’s long-term view of the market.',
        'Responsible sourcing remains central to that progress. OFC’s PEFC FM/COC certification underpins a supply chain built on traceable, sustainably managed timber, ensuring the milestones ahead are reached as responsibly as those already behind us.',
      ],
    },
  ],
};

const VI: MilestonesContent = {
  breadcrumbHome: 'Trang chủ',
  breadcrumbAbout: 'Giới thiệu',
  title: 'Cột mốc thành lập',
  bannerImage: null,
  body: [
    {
      heading: 'Hành trình phát triển',
      paragraphs: [
        'Từ những ngày đầu thành lập, OFC — trực thuộc CÔNG TY TNHH BÌNH MINH HP — đã phát triển từ một cơ sở chế biến gỗ trong vùng thành một trong những nhà xuất khẩu dăm gỗ và viên nén gỗ uy tín của Việt Nam. Đặt trụ sở tại Khu công nghiệp Cái Lân, Quảng Ninh, công ty xây dựng uy tín dựa trên chất lượng ổn định, giao hàng đáng tin cậy và quan hệ đối tác lâu dài với khách hàng khắp châu Á.',
        'Mỗi chặng đường phát triển đều được dẫn dắt bởi một cam kết giản dị: cung cấp các sản phẩm lâm nghiệp bền vững, đáp ứng đúng yêu cầu kỹ thuật mà đối tác tin tưởng, trong từng lô hàng.',
      ],
    },
    {
      heading: 'Tăng trưởng và cột mốc',
      paragraphs: [
        'Khi nhu cầu tăng cao, OFC đã mở rộng quy mô sản xuất lên công suất khoảng một triệu BDMT mỗi năm và thiết lập các kênh xuất khẩu ổn định sang Trung Quốc, Nhật Bản và Hàn Quốc. Việc tiếp tục đầu tư cơ sở vật chất — bao gồm nhà máy dăm gỗ và viên nén theo kế hoạch — thể hiện tầm nhìn dài hạn của công ty với thị trường.',
        'Nguồn cung có trách nhiệm vẫn là trọng tâm của sự phát triển đó. Chứng nhận PEFC FM/COC của OFC là nền tảng cho một chuỗi cung ứng minh bạch, từ nguồn gỗ được quản lý bền vững, đảm bảo những cột mốc phía trước được chinh phục một cách trách nhiệm như những gì đã đạt được.',
      ],
    },
  ],
};

export function milestonesContent(locale: string): MilestonesContent {
  return locale.startsWith('vi') ? VI : EN;
}
