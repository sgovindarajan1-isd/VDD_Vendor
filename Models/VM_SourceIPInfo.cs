using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Newtonsoft.Json;

namespace WebMaterialPOC.Models
{
    public class VM_SourceIPInfo
    {
        //[JsonProperty("sourceIPAddress")]
        public string SourceIpAddress { get; set; }

      //  [JsonProperty("continentCode")]
        public string ContinentCode { get; set; }

     //   [JsonProperty("continentName")]
        public string ContinentName { get; set; }

     //   [JsonProperty("countryCode")]
        public string CountryCode { get; set; }

     //   [JsonProperty("countryName")]
        public string CountryName { get; set; }

     //   [JsonProperty("stateProvCode")]
        public string StateProvCode { get; set; }

      //  [JsonProperty("stateProv")]
        public string StateProv { get; set; }

     //   [JsonProperty("city")]
        public string City { get; set; }

     //   [JsonProperty("sourceIPLocation")]
        public string SourceIPLocation { get; set; }

    //    [JsonProperty("sourceheaderInfo")]
        public string SourceHeaderInfo { get; set; }

     //   [JsonProperty("sourceServerName")]
        public string SourceServerName { get; set; }

      //  [JsonProperty("sourceOSInfo")]
        public string SourceOSInfo { get; set; }
    }
}