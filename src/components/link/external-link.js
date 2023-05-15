import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useDialog } from "../../hooks";
import { ExternalLinkIcon } from "../icons";

export const ExternalLink = ({
  to,
  asOutlinedButton,
  asFilledButton,
  noIcon,
  lightIcon,
  children,
  className,
  ...props
}) => {
  const dialog = useDialog();
  const [requiresConfirmation, setRequiresConfirmation] = useState();

  useEffect(() => {
    const hostRegexPattern = new RegExp(/^https?:\/\/.+\.([a-z]{2,3})\//);
    const match = hostRegexPattern.exec(to);
    if (match) {
      const tld = match[1];
      setRequiresConfirmation(tld !== "gov");
    }
  }, [to]);

  const triggerDialog = event => {
    event.preventDefault();
    dialog.setTitle("Leaving BDC");
    dialog.setContents(
      <div>
        <p>
          This graphic notice ({" "}
          <ExternalLinkIcon size={14} fill="var(--color-blueberry)" /> ) next 
          to a link within the BDC ecosystem indicates that the link leads to 
          another site that is not a federal government website.
        </p>
        <p>
          NHLBI cannot attest to the accuracy of information provided on
          external websites.
        </p>
        <p>
          Linking to a non-federal website does not constitute an endorsement by
          NHLBI of the sponsors or of the information and products presented on
          the website.
        </p>
        <p>
          You will be subject to the destination's privacy policy when you
          follow the link.
        </p>
        <p>Are you sure you want to navigate to this site?</p>
      </div>
    );
    dialog.setContinueHandler(() => () => window.open(to, "_blank"));
    dialog.open();
  };

  return requiresConfirmation ? (
    <a 
      href={to} 
      onClick={triggerDialog} 
      className={`${className} ${asOutlinedButton && 'outlined'} ${asFilledButton && 'filled'} button-link`} 
    >
      {children}
      {!noIcon && (
        <ExternalLinkIcon
          fill={lightIcon ? "#eee" : "var(--color-blueberry)"}
          size={14}
          {...props}
          style={{ marginLeft: "0.25rem" }}
        />
      )}
    </a>
  ) : (
    <a 
      href={to} 
      className={`${className} ${asOutlinedButton && 'outlined'} ${asFilledButton && 'filled'} button-link`} 
      target="_blank" 
      rel="noopener noreferrer" 
      {...props}
    >
      {children}
    </a>
  );
};

ExternalLink.propTypes = {
  asOutlinedButton: (props, propName, componentName) => {
    if (props.asFilledButton && props.asOutlinedButton) {
      return new Error(`Use at most one of "asFilledButton" and "asOutlinedButton."`);
    }
  },
  asFilledButton: (props, propName, componentName) => {
    if (props.asFilledButton && props.asOutlinedButton) {
      return new Error(`Use at most one of "asFilledButton" and "asOutlinedButton."`);
    }
  },
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  noIcon: (props, propName, componentName) => {
    if (props.noIcon && props.lightIcon) {
      return new Error(`Use at most one of "noIcon" and "lightIcon." `);
    }
  },
  lightIcon: (props, propName, componentName) => {
    if (props.noIcon && props.lightIcon) {
      return new Error(`Use at most one of "noIcon" and "lightIcon." `);
    }
  },
  to: PropTypes.string.isRequired,
};
