import { useEffect } from "react";
import { kcSanitize } from "keycloakify/lib/kcSanitize";
import { getKcClsx } from "keycloakify/login/lib/kcClsx";
import { useSetClassName } from "keycloakify/tools/useSetClassName";
import { useInitialize } from "keycloakify/login/Template.useInitialize";
import type { TemplateProps } from "keycloakify/login/TemplateProps";
import type { I18n } from "./i18n";
import type { KcContext } from "./KcContext";
import "./Template.css";

export default function Template(props: TemplateProps<KcContext, I18n>) {
    const {
        displayMessage = true,
        socialProvidersNode = null,
        documentTitle,
        bodyClassName,
        kcContext,
        doUseDefaultCss,
        classes,
        children
    } = props;

    const { kcClsx } = getKcClsx({ doUseDefaultCss, classes });

    const { message } = kcContext;

    useEffect(() => {
        document.title = documentTitle ?? "bamkabu";
    }, []);

    useSetClassName({
        qualifiedName: "html",
        className: kcClsx("kcHtmlClass")
    });

    useSetClassName({
        qualifiedName: "body",
        className: bodyClassName ?? "bamkabu-body"
    });

    const { isReadyToRender } = useInitialize({ kcContext, doUseDefaultCss });

    if (!isReadyToRender) {
        return null;
    }

    return (
        <div className="bamkabu-container">
            <div className="bamkabu-card">
                <div className="bamkabu-logo">
                    <img src={`${import.meta.env.BASE_URL}bamkabu.png`} alt="bamkabu" />
                </div>
                <div className="bamkabu-header-text">당신은 누구인가요?!</div>
                
                <div className="bamkabu-content">
                    <h2>인증해주세요!</h2>
                    {displayMessage && message !== undefined && (
                        <div className={`bamkabu-alert bamkabu-alert-${message.type}`}>
                            <span
                                dangerouslySetInnerHTML={{
                                    __html: kcSanitize(message.summary)
                                }}
                            />
                        </div>
                    )}
                    {children}
                    {socialProvidersNode !== null && (
                        <div className="bamkabu-social">
                            {socialProvidersNode}
                        </div>
                    )}
                </div>
                
                <div className="bamkabu-footer">
                    이 곳은 밤비와 쿼카의 보금자리입니다.<br/>
                    밤비&쿼카의 편안한 휴식을 위해 외부인은 출입을 삼가주세요.
                </div>
            </div>
        </div>
    );
}