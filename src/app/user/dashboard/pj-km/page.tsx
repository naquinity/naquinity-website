import Link from "next/link";
import { createClient } from "@supabase/supabase-js";
import ScrollableContainer from "@/components/ui/ScrollableContainer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "PJ Matkul & KM Kelas | Naquinity",
};

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);

const TABLE_PJ_KM = "pj_km";

export default async function UserPJKMPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const selectedSemester =
    typeof params.semester === "string" ? params.semester : null;

  // Build Query
  let pjKmList = null;

  if (selectedSemester) {
    const semesterInt = parseInt(selectedSemester);
    if (!isNaN(semesterInt)) {
      const { data } = await supabase
        .from(TABLE_PJ_KM)
        .select("*")
        .eq("semester", semesterInt)
        .order("role", { ascending: true })
        .order("name", { ascending: true });

      pjKmList = data;
    }
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-teal-700 mb-2">
          PJ Matkul & KM Kelas
        </h2>
        <p className="text-slate-600">
          Daftar PJ Matkul dan KM Kelas per semester
        </p>
      </div>

      {/* Filter Semester */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 bg-white rounded-2xl shadow-md p-4 max-w-full overflow-hidden">
          <span className="text-sm font-bold text-slate-700 whitespace-nowrap px-2">
            Pilih Semester:
          </span>
          <div className="flex-1 min-w-0">
            <ScrollableContainer>
              <div className="flex gap-2 sm:gap-3 min-w-max py-1">
                {[...Array(8)].map((_, i) => {
                  const sem = (i + 1).toString();
                  return (
                    <Link
                      key={sem}
                      href={`/user/dashboard/pj-km?semester=${sem}`}
                      className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all whitespace-nowrap ${
                        selectedSemester === sem
                          ? "bg-primary text-white shadow-md shadow-primary/20 scale-105"
                          : "bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-slate-900 border border-slate-200/60"
                      }`}
                    >
                      Semester {sem}
                    </Link>
                  );
                })}
              </div>
            </ScrollableContainer>
          </div>
        </div>
      </div>

      {!selectedSemester ? (
        <div className="bg-white rounded-2xl shadow-lg p-12 text-center border border-slate-100">
          <span className="material-symbols-outlined text-6xl text-slate-300 mb-4 animate-bounce">
            ads_click
          </span>
          <h3 className="text-2xl font-bold text-slate-700 mb-2">
            Pilih Semester
          </h3>
          <p className="text-slate-500 max-w-md mx-auto">
            Silakan pilih semester pada menu di atas untuk menampilkan daftar
            Penanggung Jawab Mata Kuliah dan Ketua Murid Kelas.
          </p>
        </div>
      ) : pjKmList && pjKmList.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {pjKmList.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition"
            >
              {item.photo_url ? (
                <img
                  src={item.photo_url}
                  alt={item.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-2 border-slate-200"
                />
              ) : (
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-teal-400 to-cyan-500 mx-auto mb-4 flex items-center justify-center">
                  <span className="material-symbols-outlined text-4xl text-white">
                    person
                  </span>
                </div>
              )}

              <h3 className="font-bold text-slate-900 mb-1">{item.name}</h3>
              <p className="text-sm text-slate-600 mb-2">{item.nim}</p>

              {/* Role Badge */}
              {item.role === "PJ Matkul" ? (
                <div className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-3">
                  <span className="material-symbols-outlined !text-sm">
                    book
                  </span>
                  <span>PJ Matkul</span>
                </div>
              ) : (
                <div className="inline-flex items-center gap-1 px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium mb-3">
                  <span className="material-symbols-outlined !text-sm">
                    groups
                  </span>
                  <span>KM Kelas</span>
                </div>
              )}

              {/* Details */}
              <div className="space-y-2 text-sm mt-3 border-t border-slate-100 pt-3">
                <div className="flex items-center justify-center gap-2 text-slate-600">
                  <span className="material-symbols-outlined !text-base">
                    school
                  </span>
                  <span>Kelas {item.kelas}</span>
                </div>
                {item.matkul && (
                  <div className="flex items-center justify-center gap-2 text-slate-600">
                    <span className="material-symbols-outlined !text-base">
                      menu_book
                    </span>
                    <span className="font-medium line-clamp-1">
                      {item.matkul}
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-lg p-12 text-center border border-slate-100">
          <span className="material-symbols-outlined text-6xl text-slate-300 mb-4">
            school
          </span>
          <h3 className="text-xl font-bold text-slate-700 mb-2">Data Kosong</h3>
          <p className="text-slate-500">
            Belum ada data PJ Matkul-KM Kelas untuk Semester {selectedSemester}
          </p>
        </div>
      )}
    </div>
  );
}
