export const dashboardLoader = async () => {
  const noticeRes = await fetch(
    "http://localhost:5000/api/v1/notice/get-notice?limit=4"
  );
  const notice = await noticeRes.json();
  return { notice };
};
