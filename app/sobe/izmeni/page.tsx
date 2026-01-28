import Link from 'next/link'
import RoomForm from '../components/RoomForm';
import { ucitajSobuId, azurirajSobu } from '@/actions/soba';
import { getLocaleMessages } from '@/i18n/i18n';


type SearchParams = {
    sobaId?: string;
    lang?: string;
};

export default async function IdPage({ searchParams }: { searchParams: Promise<SearchParams> | SearchParams }) {
    const params = typeof searchParams === 'object' && 'then' in searchParams
        ? await searchParams
        : searchParams;

    const lang: "en" | "sr" = params.lang === "sr" ? "sr" : "en";
    const t = getLocaleMessages(lang, 'sobe');
    const id = Number(params.sobaId);

    if (!params.sobaId || isNaN(id)) {
        return <div>{t("invalid")}</div>;
    }

    const room = await ucitajSobuId({ sobaId: id });

    if (!room) {
        return <div>{t("notfound")}</div>;
    }

    return (
        <>
            <div className="flex flex-col items-center justify-center min-h-screen">
                <div className="w-full max-w-md">
                    <Link className="text-grey-600 hover:text-blue-900" href={`/sobe?lang=${lang}`}>
                        {t.back}
                    </Link>
                    <h1 className="text-2xl font-bold mb-4">{t.edit}</h1>
                    <RoomForm
                        action={azurirajSobu}
                        initialData={{ ...room, id: String(room.id) }}
                        mode="edit"
                    />
                </div>
            </div>
        </>
    );
}